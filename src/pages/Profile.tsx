import { Link } from "react-router-dom";
import { pathways } from "../data/canon";
import { chapterIndex } from "../data/chapterIndex";
import { useArchive } from "../state/archive";
import { useLanguage } from "../i18n/LanguageContext";
import { pathwayLabel, text } from "../domain/exploration";
import { Glyph, PathwayCard } from "../components/Mystic";

export default function Profile() {
  const { archive, update, message } = useArchive();
  const { language } = useLanguage();
  const chosen = pathways.find((p) => p.id === archive.chosenPathway);
  const savedPaths = pathways.filter((p) => archive.favorites.includes(p.id));
  const savedChapters = chapterIndex.filter((c) =>
    archive.favorites.includes(`ch:${c.number}`),
  );
  const chapterLabel = (c: (typeof chapterIndex)[number]) => c.title[language];
  function exportBackup() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(archive, null, 2)], {
        type: "application/json",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "lotm-archive.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE PERSONAL ARCHIVE</span>
          <h1>
            {text(
              language,
              "你的非凡，值得记录。",
              "Your extraordinary, remembered.",
            )}
          </h1>
          <p>
            {text(
              language,
              "保存身份、收藏与每一次探索的回响。",
              "Keep your identity, discoveries and moments of resonance.",
            )}
          </p>
        </div>
      </div>
      <section className="profile-layout">
        <div className="profile-summary">
          <div className="profile-avatar" data-avatar={archive.avatar}>
            <Glyph
              id={
                { moon: "moon", eye: "fool", star: "hermit", key: "door" }[
                  archive.avatar
                ]
              }
              size={92}
            />
          </div>
          <h2>
            {archive.nickname ||
              text(language, "尚未留名的寻途者", "An unnamed seeker")}
          </h2>
          <p>
            {chosen
              ? pathwayLabel(chosen, language)
              : text(
                  language,
                  "你的途径，由你选择",
                  "Your path is yours to choose",
                )}
          </p>
          <span className="sync-state local" role="status">
            ● {text(language, "保存在此浏览器", "Saved in this browser")}
          </span>
          <p className="small-copy">
            {text(
              language,
              "档案仅保存在当前浏览器，不会跨设备同步。清除网站数据前，请导出备份。",
              "Your archive stays in this browser. Export a backup before clearing site data; it does not sync across devices.",
            )}
          </p>
          {message === "storage" && (
            <p role="status" className="status-text">
              {text(
                language,
                "浏览器存储不可用，请导出备份。",
                "Browser storage is unavailable. Export a backup.",
              )}
            </p>
          )}
        </div>
        <div className="profile-editor">
          <span className="eyebrow">
            {text(language, "身份设定", "IDENTITY SETTINGS")}
          </span>
          <label>
            {text(language, "昵称", "Nickname")}
            <input
              value={archive.nickname}
              maxLength={40}
              onChange={(e) =>
                update((a) => ({ ...a, nickname: e.target.value }))
              }
            />
          </label>
          <label>
            {text(language, "自选途径", "Chosen pathway")}
            <select
              value={archive.chosenPathway}
              onChange={(e) =>
                update((a) => ({ ...a, chosenPathway: e.target.value }))
              }
            >
              <option value="">
                {text(language, "尚未选择", "Not chosen")}
              </option>
              {pathways.map((p) => (
                <option key={p.id} value={p.id}>
                  {pathwayLabel(p, language)}
                </option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend>{text(language, "身份徽记", "Personal emblem")}</legend>
            <div className="avatar-options">
              {(["moon", "eye", "star", "key"] as const).map((avatar, i) => (
                <button
                  key={avatar}
                  className="icon-button"
                  aria-label={
                    language === "zh" ? ["月", "眼", "星", "钥匙"][i] : avatar
                  }
                  aria-pressed={archive.avatar === avatar}
                  onClick={() => update((a) => ({ ...a, avatar }))}
                >
                  {["☾", "◉", "✧", "⚿"][i]}
                </button>
              ))}
            </div>
          </fieldset>
          {chosen && (
            <Link className="button primary" to={`/result/${chosen.id}`}>
              {text(language, "生成我的身份卡", "Create my identity card")} ↗
            </Link>
          )}
          <button className="text-button" onClick={exportBackup}>
            {text(language, "导出档案备份", "Export archive backup")} ↓
          </button>
          <p className="small-copy muted">
            {text(
              language,
              "自选身份与测评倾向分别记录。资料浏览不会自动提升序列。",
              "Your chosen identity and assessment affinity are separate. Browsing does not advance your Sequence.",
            )}
          </p>
        </div>
      </section>
      <section className="profile-section">
        <div className="section-row">
          <h2>{text(language, "收藏的途径", "Saved pathways")}</h2>
          <span className="folio">{savedPaths.length}</span>
        </div>
        <div className="path-grid">
          {savedPaths.map((p) => (
            <PathwayCard key={p.id} p={p} />
          ))}
        </div>
        {!savedPaths.length && (
          <p className="empty-inline">
            {text(
              language,
              "星图中的每条途径都可以收藏。",
              "Save a pathway from the atlas to keep it here.",
            )}{" "}
            <Link to="/directory">{text(language, "去探索", "Explore")} →</Link>
          </p>
        )}
      </section>
      <section className="profile-section">
        <h2>{text(language, "收藏的资料", "Saved references")}</h2>
        {savedChapters.length ? (
          savedChapters.map((c) => (
            <div className="history-row" key={c.number}>
              <span className="folio">{c.number}</span>
              <Link to={`/plot-search?q=${c.number}`}>{chapterLabel(c)}</Link>
              <button
                className="text-button"
                onClick={() =>
                  update((a) => ({
                    ...a,
                    favorites: a.favorites.filter(
                      (id) => id !== `ch:${c.number}`,
                    ),
                  }))
                }
              >
                {text(language, "取消收藏", "Remove")}
              </button>
            </div>
          ))
        ) : (
          <p className="empty-inline">
            {text(
              language,
              "搜索结果中的章节可以收藏在这里。",
              "Save chapter entries from search results.",
            )}{" "}
            <Link to="/plot-search">
              {text(language, "查找资料", "Find references")} →
            </Link>
          </p>
        )}
      </section>
      <section className="profile-section">
        <h2>{text(language, "测评回响", "Assessment history")}</h2>
        {archive.history.length ? (
          archive.history.map((s) => {
            const p = pathways.find((p) => p.id === s.scores[0]?.id);
            return (
              p && (
                <Link
                  className="history-row"
                  key={s.id}
                  to={`/result/${p.id}?record=${s.id}`}
                >
                  <Glyph id={p.id} size={40} />
                  <span>
                    {pathwayLabel(p, language)}
                    <small>
                      {new Date(s.createdAt).toLocaleString(
                        language === "zh" ? "zh-CN" : "en-US",
                      )}
                    </small>
                  </span>
                  <span>{text(language, "查看快照", "Open snapshot")} ↗</span>
                </Link>
              )
            );
          })
        ) : (
          <p className="empty-inline">
            {text(
              language,
              "你的第一次回响还未揭晓。",
              "Your first resonance awaits.",
            )}{" "}
            <Link to="/quiz">
              {text(language, "开始评估", "Begin assessment")} →
            </Link>
          </p>
        )}
      </section>
      <section className="profile-section">
        <h2>{text(language, "最近探索", "Recent explorations")}</h2>
        <div className="chips">
          {archive.recent.map((r) => {
            const p = pathways.find((p) => p.id === r.id);
            const c = chapterIndex.find((c) => `ch:${c.number}` === r.id);
            return p ? (
              <Link key={r.id} to={`/pathways/${p.id}`}>
                {pathwayLabel(p, language)} ↗
              </Link>
            ) : c ? (
              <Link key={r.id} to={`/plot-search?q=${c.number}`}>
                {chapterLabel(c)} ↗
              </Link>
            ) : null;
          })}
        </div>
      </section>
    </>
  );
}
