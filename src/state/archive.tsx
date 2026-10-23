import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { BACKEND_ENABLED } from "../config/features";
import {
  getSupabaseClient,
  isSupabaseConfigured,
} from "../utils/supabaseClient";
import {
  initialReading,
  normalizeReading,
  validateSnapshot,
  type Reading,
  type Snapshot,
} from "../domain/exploration";
import { pathways } from "../data/canon";
import { chapterIndex } from "../data/chapterIndex";
import { ArchiveSync, type SyncState } from "./archiveSync";

export type Archive = {
  schema: 2;
  nickname: string;
  avatar: string;
  chosenPathway: string;
  reading: Reading;
  favorites: string[];
  history: Snapshot[];
  recent: Array<{ id: string; at: string }>;
};
export const emptyArchive = (): Archive => ({
  schema: 2,
  nickname: "",
  avatar: "moon",
  chosenPathway: "",
  reading: { ...initialReading },
  favorites: [],
  history: [],
  recent: [],
});
const pathwayIds = new Set(pathways.map((p) => p.id));
const chapterIds = new Set(chapterIndex.map((c) => `ch:${c.number}`));
const validContent = (id: unknown): id is string =>
  typeof id === "string" && (pathwayIds.has(id) || chapterIds.has(id));
export function sanitizeArchive(value: unknown): Archive {
  const base = emptyArchive();
  if (!value || typeof value !== "object") return base;
  const v = value as Partial<Archive>;
  const history = Array.isArray(v.history)
    ? v.history.map(validateSnapshot).filter((s): s is Snapshot => s !== null)
    : [];
  const recent = Array.isArray(v.recent)
    ? v.recent.filter(
        (r) =>
          r &&
          validContent(r.id) &&
          typeof r.at === "string" &&
          Number.isFinite(Date.parse(r.at)),
      )
    : [];
  return {
    ...base,
    nickname: typeof v.nickname === "string" ? v.nickname.slice(0, 40) : "",
    avatar: ["moon", "eye", "star", "key"].includes(v.avatar || "")
      ? v.avatar!
      : "moon",
    chosenPathway: pathwayIds.has(v.chosenPathway || "")
      ? v.chosenPathway!
      : "",
    reading: normalizeReading(v.reading),
    favorites: Array.isArray(v.favorites)
      ? [...new Set(v.favorites.filter(validContent))].slice(0, 200)
      : [],
    history: [...new Map(history.map((s) => [s.id, s])).values()]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 50),
    recent: [...new Map(recent.map((r) => [r.id, r])).values()]
      .sort((a, b) => b.at.localeCompare(a.at))
      .slice(0, 12),
  };
}
function readLocal(owner: string) {
  try {
    return sanitizeArchive(
      JSON.parse(localStorage.getItem(`lotm.archive.v2.${owner}`) || "null"),
    );
  } catch {
    return emptyArchive();
  }
}
function isPending(owner: string) {
  try {
    return localStorage.getItem(`lotm.pending.${owner}`) === "1";
  } catch {
    return true;
  }
}
type Context = {
  archive: Archive;
  update: (fn: (a: Archive) => Archive) => void;
  session: Session | null;
  sync: SyncState;
  message: string;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  retry: () => Promise<void>;
  importGuest: () => void;
  addSnapshot: (s: Snapshot) => void;
  favorite: (id: string) => void;
  visit: (id: string) => void;
};
const ArchiveContext = createContext<Context | null>(null);
export function ArchiveProvider({ children }: { children: ReactNode }) {
  const [archive, setArchive] = useState(() => readLocal("guest"));
  const [session, setSession] = useState<Session | null>(null);
  const [sync, setSync] = useState<SyncState>("local");
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const engine = useRef<ArchiveSync<Archive>>();
  if (!engine.current)
    engine.current = new ArchiveSync(archive, {
      read: async (owner) => {
        const { data, error } = await getSupabaseClient()
          .from("lotm_archives")
          .select("document,revision")
          .eq("user_id", owner)
          .abortSignal(AbortSignal.timeout(10000))
          .maybeSingle();
        if (error) throw error;
        return data
          ? {
              document: sanitizeArchive(data.document),
              revision: data.revision,
            }
          : null;
      },
      save: async (owner, document, revision) => {
        const {
          data: { session: currentSession },
        } = await getSupabaseClient().auth.getSession();
        if (currentSession?.user.id !== owner)
          throw new Error("account_changed");
        const { data, error } = await getSupabaseClient()
          .rpc("save_lotm_archive", { document, expected_revision: revision })
          .abortSignal(AbortSignal.timeout(10000));
        if (
          error ||
          !data ||
          typeof data.ok !== "boolean" ||
          !Number.isInteger(data.revision)
        )
          throw error || new Error("invalid_response");
        return data;
      },
      changed: (owner, value) => {
        setArchive(value);
        try {
          localStorage.setItem(
            `lotm.archive.v2.${owner}`,
            JSON.stringify(value),
          );
        } catch {
          setMessage("storage");
        }
      },
      pending: (owner, pending) => {
        try {
          if (pending) localStorage.setItem(`lotm.pending.${owner}`, "1");
          else localStorage.removeItem(`lotm.pending.${owner}`);
        } catch {
          setMessage("storage");
        }
      },
      status: setSync,
    });
  const loadSession = useCallback(async (next: Session | null) => {
    const nextOwner = next?.user.id || "guest";
    setSession(next);
    if (engine.current!.owner === nextOwner) return;
    clearTimeout(timer.current);
    setMessage("");
    await engine.current!.select(
      nextOwner,
      readLocal(nextOwner),
      nextOwner !== "guest" && isPending(nextOwner),
    );
  }, []);
  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let live = true;
    let authEvent = 0;
    const client = getSupabaseClient();
    const initialVersion = authEvent;
    client.auth
      .getSession()
      .then(({ data, error }) => {
        if (live && initialVersion === authEvent) {
          if (error) setMessage("login");
          else void loadSession(data.session);
        }
      })
      .catch(() => {
        if (live) setMessage("login");
      });
    const { data } = client.auth.onAuthStateChange((_event, next) => {
      const event = ++authEvent;
      setTimeout(() => {
        if (live && event === authEvent) void loadSession(next);
      }, 0);
    });
    return () => {
      live = false;
      data.subscription.unsubscribe();
      clearTimeout(timer.current);
    };
  }, [loadSession]);
  const update = useCallback((fn: (a: Archive) => Archive) => {
    const state = engine.current!;
    state.write(sanitizeArchive(fn(state.document)));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => void state.flush(), 650);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () =>
      (document.documentElement.dataset.motion =
        archive.reading.reducedMotion || media.matches ? "reduced" : "full");
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [archive.reading.reducedMotion]);
  const login = async () => {
    if (!isSupabaseConfigured()) {
      setMessage("unconfigured");
      return;
    }
    try {
      const { error } = await getSupabaseClient().auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${location.origin}/auth/callback` },
      });
      if (error) setMessage("login");
    } catch {
      setMessage("login");
    }
  };
  const logout = async () => {
    if (!BACKEND_ENABLED) return;
    clearTimeout(timer.current);
    try {
      await engine.current!.flush();
      const { error } = await getSupabaseClient().auth.signOut();
      if (error) {
        setMessage("logout");
        return;
      }
      await loadSession(null);
    } catch {
      setMessage("logout");
    }
  };
  const retry = async () => {
    if (!BACKEND_ENABLED) return;
    setMessage("");
    await engine.current!.retryLocal();
  };
  const importGuest = () => {
    if (engine.current!.owner === "guest") return;
    const guest = readLocal("guest");
    update((a) => ({
      ...a,
      nickname: a.nickname || guest.nickname,
      chosenPathway: a.chosenPathway || guest.chosenPathway,
      reading: a.reading,
      favorites: [...new Set([...a.favorites, ...guest.favorites])],
      history: [
        ...a.history,
        ...guest.history.filter((s) => !a.history.some((h) => h.id === s.id)),
      ],
      recent: [
        ...a.recent,
        ...guest.recent.filter((r) => !a.recent.some((x) => x.id === r.id)),
      ],
    }));
    setMessage("imported");
  };
  const addSnapshot = useCallback(
    (s: Snapshot) =>
      update((a) => ({
        ...a,
        history: [s, ...a.history.filter((x) => x.id !== s.id)].slice(0, 50),
      })),
    [update],
  );
  const favorite = useCallback(
    (id: string) => {
      if (validContent(id))
        update((a) => ({
          ...a,
          favorites: a.favorites.includes(id)
            ? a.favorites.filter((x) => x !== id)
            : [...a.favorites, id],
        }));
    },
    [update],
  );
  const visit = useCallback(
    (id: string) => {
      if (validContent(id))
        update((a) => ({
          ...a,
          recent: [
            { id, at: new Date().toISOString() },
            ...a.recent.filter((x) => x.id !== id),
          ].slice(0, 12),
        }));
    },
    [update],
  );
  return (
    <ArchiveContext.Provider
      value={{
        archive,
        update,
        session,
        sync,
        message,
        login,
        logout,
        retry,
        importGuest,
        addSnapshot,
        favorite,
        visit,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
}
export function useArchive() {
  const value = useContext(ArchiveContext);
  if (!value) throw new Error("ArchiveProvider missing");
  return value;
}
