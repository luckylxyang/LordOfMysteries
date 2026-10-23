import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  pathways,
  groups,
  sources,
  type CanonPathway,
  type FieldEvidence,
} from "../data/canon";
import { useLanguage } from "../i18n/LanguageContext";
import { useArchive } from "../state/archive";
import { recordVisit } from "../utils/telemetry";
import { pathwayLabel, text } from "../domain/exploration";
import { glyphFrame, pathwayGlyph } from "../data/pathwayGlyphs";

export function Glyph({
  id = "fool",
  size = 56,
}: {
  id?: string;
  size?: number;
}) {
  const art = pathwayGlyph(id);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className="glyph"
      data-pathway={id}
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g className="glyph-frame" opacity=".4" strokeWidth=".7">
        {glyphFrame.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="glyph-mark">
        {art.lines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="glyph-accent" opacity=".55" strokeWidth=".8">
        {art.accents.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

export function SourceLinks({
  ids,
  label,
  locator,
}: {
  ids: string[];
  label?: string;
  locator?: string;
}) {
  const { language } = useLanguage();
  const references = sources.filter((s) => ids.includes(s.id));
  if (!references.length)
    return (
      <p className="small-copy muted">
        {text(language, "出处待补充。", "Source details are pending.")}
      </p>
    );
  return (
    <details className="source-notes">
      <summary>
        {label ??
          text(
            language,
            "来源与核对范围",
            "Sources and verification scope",
          )}{" "}
        · {references.length}
      </summary>
      <p className="small-copy muted">
        {text(
          language,
          "来源只支持所注明的具体范围，尚未完成全书逐章核验。外部页面可能包含续作设定。",
          "Sources support only their stated scope, not a complete chapter audit. External pages may include sequel material.",
        )}
      </p>
      {locator && (
        <p className="small-copy source-locator">
          {text(language, "本项定位：", "Field location: ")}
          {locator}
        </p>
      )}
      {references.map((s) => {
        return (
          <div className="source-entry" key={s.id}>
            <div className="source-links">
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title} ↗
              </a>
            </div>
            {s.edition && (
              <p className="small-copy muted">
                {s.edition[language]} · {text(language, "核对", "Checked")}{" "}
                {s.checkedAt}
              </p>
            )}
            <p className="small-copy muted">{s.note[language]}</p>
          </div>
        );
      })}
    </details>
  );
}

export function FieldSource({
  evidence,
  label,
}: {
  evidence: FieldEvidence;
  label: string;
}) {
  const { language } = useLanguage();
  const status =
    evidence.status === "chapter"
      ? text(
          language,
          "本项已对照原章",
          "This field checked against the chapter",
        )
      : evidence.status === "reference"
        ? text(
            language,
            evidence.sourceIds.length === 1 &&
              evidence.sourceIds[0] === "qidian-settings"
              ? "官方设定摘要 · 原章待复核"
              : "参考摘要 · 原章待复核",
            evidence.sourceIds.length === 1 &&
              evidence.sourceIds[0] === "qidian-settings"
              ? "Official setting summary · chapter review pending"
              : "Reference summary · chapter review pending",
          )
        : text(language, "尚待原章核对", "Original-chapter check pending");
  return (
    <div className={`field-evidence evidence-${evidence.status}`}>
      {evidence.sourceIds.length ? (
        <SourceLinks
          ids={evidence.sourceIds}
          label={`${label} · ${status}`}
          locator={evidence.locator?.[language]}
        />
      ) : (
        <p className="small-copy muted">
          {label} · {status}
        </p>
      )}
    </div>
  );
}

export function StarMap({
  selected,
  onSelect,
  relations = true,
  compact = false,
}: {
  selected: string;
  onSelect: (id: string) => void;
  relations?: boolean;
  compact?: boolean;
}) {
  const { language } = useLanguage();
  const active = pathways.find((p) => p.id === selected) || pathways[0];
  const gradient = useId().replace(/:/g, "");
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const nodes = pathways.map((p, i) => {
    const a = (i / pathways.length) * Math.PI * 2 - Math.PI / 2;
    return { p, x: 300 + Math.cos(a) * 225, y: 300 + Math.sin(a) * 225 };
  });
  return (
    <div
      className={`star-map ${compact ? "compact" : ""}`}
      style={{ "--path-color": active.color } as CSSProperties}
      role="group"
      aria-label={text(
        language,
        "途径星图，方向键切换途径",
        "Pathway atlas. Use arrow keys to change paths.",
      )}
    >
      <div className="map-aura" />
      <svg className="map-lines" viewBox="0 0 600 600" aria-hidden="true">
        <defs>
          <radialGradient id={gradient}>
            <stop stopColor="var(--path-color)" stopOpacity=".13" />
            <stop offset="1" stopColor="var(--path-color)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="260" fill={`url(#${gradient})`} />
        <g className="orbit-ring">
          <circle cx="300" cy="300" r="282" />
          <circle cx="300" cy="300" r="275" strokeDasharray="1 12" />
          <path d="M300 18 544 441H56Z" />
        </g>
        <circle cx="300" cy="300" r="225" />
        <circle cx="300" cy="300" r="150" strokeDasharray="3 9" />
        {nodes.map(({ p, x, y }) => (
          <line
            key={p.id}
            x1="300"
            y1="300"
            x2={x}
            y2={y}
            className={p.id === active.id ? "active-ray" : "faint-ray"}
          />
        ))}
        {relations &&
          nodes
            .filter((n) => n.p.group === active.group)
            .map((a, i, arr) =>
              arr
                .slice(i + 1)
                .map((b) => (
                  <path
                    key={a.p.id + b.p.id}
                    d={`M${a.x} ${a.y}Q300 300 ${b.x} ${b.y}`}
                    className="relation-line"
                  />
                )),
            )}
        <circle cx="300" cy="300" r="90" className="inner-ring" />
        <circle cx="300" cy="300" r="98" strokeDasharray="5 7" />
      </svg>
      <div className="map-center" key={active.id} aria-live="polite">
        <Glyph id={active.id} size={compact ? 72 : 88} />
        <span>{text(language, "命运的回响", "AN ECHO OF FATE")}</span>
        <strong>{pathwayLabel(active, language)}</strong>
      </div>
      {nodes.map(({ p, x, y }, i) => (
        <button
          type="button"
          ref={(el) => {
            buttons.current[i] = el;
          }}
          tabIndex={p.id === active.id ? 0 : -1}
          className={`star-node ${p.id === active.id ? "selected" : ""} ${relations && p.group === active.group ? "related" : ""}`}
          key={p.id}
          style={
            {
              left: `${x / 6}%`,
              top: `${y / 6}%`,
              "--node-color": p.color,
              "--node-delay": `${i * 25}ms`,
            } as CSSProperties
          }
          onClick={() => onSelect(p.id)}
          onKeyDown={(event) => {
            const offset =
              event.key === "ArrowRight" || event.key === "ArrowDown"
                ? 1
                : event.key === "ArrowLeft" || event.key === "ArrowUp"
                  ? -1
                  : 0;
            if (!offset && event.key !== "Home" && event.key !== "End") return;
            event.preventDefault();
            const next =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? nodes.length - 1
                  : (i + offset + nodes.length) % nodes.length;
            onSelect(nodes[next].p.id);
            buttons.current[next]?.focus();
          }}
          aria-label={pathwayLabel(p, language)}
          aria-pressed={p.id === active.id}
        >
          <span className="node-dot" />
          <span className="node-name">{pathwayLabel(p, language)}</span>
        </button>
      ))}
      <div className="map-caption">
        <span>22</span>{" "}
        {text(language, "条途径 · 同一片未知", "PATHWAYS · ONE GREAT UNKNOWN")}
      </div>
    </div>
  );
}

export function PathwayCard({
  p,
  action,
}: {
  p: CanonPathway;
  action?: ReactNode;
}) {
  const { language } = useLanguage();
  const { archive, favorite } = useArchive();
  const saved = archive.favorites.includes(p.id);
  return (
    <article
      className="path-card"
      style={{ "--path-color": p.color } as CSSProperties}
    >
      <div className="path-card-top">
        <Glyph id={p.id} />
        <button
          type="button"
          className="icon-button"
          aria-label={`${text(language, saved ? "取消收藏" : "收藏途径", saved ? "Remove favorite" : "Favorite pathway")} · ${pathwayLabel(p, language)}`}
          aria-pressed={saved}
          onClick={() => favorite(p.id)}
        >
          {saved ? "★" : "☆"}
        </button>
      </div>
      <span className="eyebrow">
        {text(language, "途径概览", "PATHWAY OVERVIEW")}
      </span>
      <h3>
        <Link to={`/pathways/${p.id}`}>{pathwayLabel(p, language)}</Link>
      </h3>
      <p>{p.summary[language]}</p>
      <div className="path-card-bottom">
        <Link className="text-link" to={`/pathways/${p.id}`}>
          {text(language, "沿此途径探索", "Explore this pathway")} ↗
        </Link>
        {action}
      </div>
    </article>
  );
}

export function MotionSettings({ onClose }: { onClose: () => void }) {
  const { language } = useLanguage();
  const { archive, update } = useArchive();
  const [motion, setMotion] = useState(archive.reading.reducedMotion);
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useId();
  useEffect(() => {
    const d = dialog.current;
    const focus = document.activeElement as HTMLElement | null;
    d?.showModal();
    return () => {
      d?.close();
      focus?.focus();
    };
  }, []);
  const save = () => {
    update((a) => ({ ...a, reading: { reducedMotion: motion } }));
    onClose();
  };
  return (
    <dialog
      ref={dialog}
      className="motion-dialog"
      aria-labelledby={heading}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="eyebrow">MOTION PREFERENCES</div>
      <h2 id={heading}>{text(language, "动画设置", "Motion settings")}</h2>
      <p>
        {text(
          language,
          "按你的习惯调整灰雾、星图与升格的动态效果。",
          "Adjust the motion of the fog, atlas and ascent to suit you.",
        )}
      </p>
      <label className="check-line">
        <input
          type="checkbox"
          checked={motion}
          onChange={(e) => setMotion(e.target.checked)}
        />
        {text(
          language,
          "减弱动画与流动效果",
          "Reduce motion and drifting effects",
        )}
      </label>
      <button type="button" className="button primary" onClick={save}>
        {text(language, "保存设置", "Save settings")}
      </button>
    </dialog>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const { session } = useArchive();
  const [settings, setSettings] = useState(false);
  const location = useLocation();
  const owner = session?.user.id || "guest";
  useEffect(() => {
    const page = location.pathname.startsWith("/pathways/")
      ? text(language, "途径与升格", "Pathway & ascent")
      : location.pathname === "/directory"
        ? text(language, "途径星图", "Pathway atlas")
        : location.pathname === "/quiz"
          ? text(language, "非凡评估", "Assessment")
          : location.pathname.startsWith("/result/")
            ? text(language, "非凡身份", "Beyonder identity")
            : location.pathname === "/profile"
              ? text(language, "我的档案", "My archive")
              : location.pathname === "/plot-search"
                ? text(language, "隐秘档案", "Archives")
                : location.pathname === "/responder"
                  ? text(language, "同人短笺", "Fan letters")
                  : location.pathname === "/feedback"
                    ? text(language, "纠错与反馈", "Corrections & feedback")
                    : text(
                        language,
                        "途径星图与非凡身份",
                        "Pathways & identities",
                      );
    document.title = `${page} · ${text(language, "灰雾之上", "Above the Gray Fog")}`;
  }, [language, location.pathname]);
  useEffect(() => recordVisit(), []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <div className="atmosphere" aria-hidden="true">
        <div className="mist mist-one" />
        <div className="mist mist-two" />
        <div className="grain" />
      </div>
      <a className="skip-link" href="#main">
        {text(language, "跳到主要内容", "Skip to content")}
      </a>
      <header className="site-header">
        <Link className="brand" to="/">
          <Glyph size={34} />
          <span>
            LOTM<span className="brand-dot">.</span>
            <small>{text(language, "灰雾之上", "ABOVE THE GRAY FOG")}</small>
          </span>
        </Link>
        <nav aria-label={text(language, "主导航", "Main navigation")}>
          <NavLink to="/directory">
            {text(language, "途径星图", "Pathway atlas")}
          </NavLink>
          <NavLink to="/quiz">
            {text(language, "非凡评估", "Assessment")}
          </NavLink>
          <NavLink to="/plot-search">
            {text(language, "隐秘档案", "Archives")}
          </NavLink>
          <NavLink to="/profile">
            {text(language, "我的身份", "My identity")}
            {session && <span className="online-dot" />}
          </NavLink>
        </nav>
        <div className="header-controls">
          <button
            type="button"
            className="icon-button"
            onClick={() => setSettings(true)}
            title={text(language, "动画设置", "Motion settings")}
            aria-label={text(language, "动画设置", "Motion settings")}
          >
            ◐
          </button>
          <button
            type="button"
            className="language-button"
            onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
          >
            {language === "zh" ? "EN" : "中文"}
          </button>
        </div>
      </header>
      <main
        id="main"
        tabIndex={-1}
        className="site-main"
        key={`${owner}:${location.pathname}`}
      >
        {children}
      </main>
      <footer className="site-footer">
        <Link to="/">LOTM.SPACE</Link>
        <p>
          {text(
            language,
            "《诡秘之主》非官方探索档案 · 徽记与星图为网站艺术设计",
            "Unofficial Lord of Mysteries archive · emblems and atlas are artistic designs",
          )}
        </p>
      </footer>
      {settings && (
        <MotionSettings key={owner} onClose={() => setSettings(false)} />
      )}
    </>
  );
}

export function GroupName({ id }: { id: string }) {
  const { language } = useLanguage();
  return <>{groups.find((g) => g.id === id)?.name[language]}</>;
}
