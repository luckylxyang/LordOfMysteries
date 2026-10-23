import { useEffect, useRef, useState } from "react";
import type { CanonPathway } from "../data/canon";
import { text, type Language } from "../domain/exploration";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  createIdentityCardCanvas,
} from "../utils/identityCard";

export default function IdentityCard({
  path,
  nickname,
  commentary,
  language,
  assessed,
  onReady,
}: {
  path: CanonPathway;
  nickname: string;
  commentary: string;
  language: Language;
  assessed: boolean;
  onReady: (ready: boolean) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    onReady(false);
    setState("loading");
    createIdentityCardCanvas(path, nickname, commentary, language, assessed)
      .then((image) => {
        if (!active || !canvas.current) return;
        const ctx = canvas.current.getContext("2d");
        if (!ctx) throw new Error("Canvas unavailable");
        ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
        ctx.drawImage(image, 0, 0);
        setState("ready");
        onReady(true);
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, [path, nickname, commentary, language, assessed, onReady, retry]);
  const name = nickname.trim() || text(language, "寻途者", "Seeker");
  return (
    <figure className="identity-print" data-pathway={path.id}>
      <div className="identity-print-frame" aria-busy={state === "loading"}>
        <canvas
          ref={canvas}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          role="img"
          data-render-state={state}
          aria-label={`${path.name[language]} · ${text(language, "序列9", "Sequence 9")} · ${path.entry[language]} · ${name}. ${commentary}`}
        />
        {state !== "ready" && (
          <div
            className={`identity-print-status ${state}`}
            role={state === "error" ? "alert" : "status"}
          >
            <span aria-hidden="true">◇</span>
            <p>
              {state === "error"
                ? text(
                    language,
                    "插画暂时无法载入。",
                    "The illustration could not be loaded.",
                  )
                : text(
                    language,
                    "正在显影你的身份…",
                    "Revealing your identity…",
                  )}
            </p>
            {state === "error" && (
              <button
                className="text-button"
                onClick={() => setRetry((n) => n + 1)}
              >
                {text(language, "重新载入", "Try again")} ↻
              </button>
            )}
          </div>
        )}
      </div>
      <figcaption>
        {text(
          language,
          "途径之象 · 始于序列九",
          "A pathway in symbols · Begin at Sequence 9",
        )}
      </figcaption>
    </figure>
  );
}
