import { useState } from "react";
import { Link } from "react-router-dom";
import { chapterIndex } from "../data/chapterIndex";
import { pathways } from "../data/canon";
import { useLanguage } from "../i18n/LanguageContext";
import { useArchive } from "../state/archive";
import { pathwayLabel, text, questions } from "../domain/exploration";
import { Glyph, StarMap } from "../components/Mystic";

export default function AtlasHome() {
  const { language } = useLanguage();
  const { archive, session } = useArchive();
  const [selected, setSelected] = useState("fool");
  const p = pathways.find((p) => p.id === selected)!;
  const recent = pathways.find((p) => p.id === archive.recent[0]?.id);
  const recentChapter = chapterIndex.find(
    (c) => `ch:${c.number}` === archive.recent[0]?.id,
  );
  const [draftLength] = useState(() => {
    try {
      const a = JSON.parse(
        sessionStorage.getItem(
          `lotm.assessment.${session?.user.id || "guest"}`,
        ) || "[]",
      );
      return Array.isArray(a) &&
        a.length > 0 &&
        a.length < questions.length &&
        a.every((x) => Number.isInteger(x) && x >= 0 && x < 3)
        ? a.length
        : 0;
    } catch {
      return 0;
    }
  });
  const continueUrl = draftLength
    ? "/quiz"
    : recent
      ? `/pathways/${recent.id}`
      : recentChapter
        ? `/plot-search?q=${recentChapter.number}`
        : "/plot-search";
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-diamond" /> THE MYSTERIES BEGIN WITHIN
          </div>
          <h1>
            {text(language, "万物皆有途径。", "Every path holds")}
            <br />
            <em>{text(language, "而你，将走向何处？", "a mystery.")}</em>
          </h1>
          <p className="hero-description">
            {text(
              language,
              "越过灰雾，循着灵性的微光。\n在二十二条非凡途径之间，发现属于你的回响。",
              "Cross the gray fog. Follow a glimmer of spirituality.\nFind your resonance among twenty-two Beyonder pathways.",
            )}
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/directory">
              {text(language, "展开途径星图", "Explore the atlas")}{" "}
              <span>↗</span>
            </Link>
            <Link className="button ghost" to="/quiz">
              {text(language, "发现我的途径", "Discover my pathway")}
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="line" />
            {text(
              language,
              "知识有重量。每一次知晓，都是一次靠近。",
              "Knowledge carries weight. Every revelation brings you closer.",
            )}
          </div>
        </div>
        <div className="hero-map">
          <StarMap selected={selected} onSelect={setSelected} compact />
          <Link to={`/pathways/${p.id}`} className="map-discovery">
            <span>{text(language, "此刻的回响", "CURRENT RESONANCE")}</span>
            <strong>{pathwayLabel(p, language)}</strong>
            <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="entry-section">
        <div className="section-label">
          01 / {text(language, "选择你的入口", "CHOOSE YOUR ENTRANCE")}
        </div>
        <div className="entry-grid">
          <Link to="/directory" className="entry-card">
            <span className="entry-number">I</span>
            <Glyph id="hermit" />
            <h2>
              {text(language, "理解非凡", "Understand the extraordinary")}
            </h2>
            <p>
              {text(
                language,
                "序列、权柄与相邻途径。沿着知识的纹路，读懂世界的另一面。",
                "Sequences, authorities and neighboring paths. Trace the hidden structure of the world.",
              )}
            </p>
            <span className="text-link">
              {text(language, "探索途径", "Explore pathways")} ↗
            </span>
          </Link>
          <Link to="/quiz" className="entry-card">
            <span className="entry-number">II</span>
            <Glyph id="visionary" />
            <h2>{text(language, "映照自我", "Meet your reflection")}</h2>
            <p>
              {text(
                language,
                "八个情境，一次内心的探寻。让选择勾勒出你的非凡倾向。",
                "Eight situations. One inward journey. Let your choices reveal an affinity.",
              )}
            </p>
            <span className="text-link">
              {text(language, "开始评估", "Begin assessment")} ↗
            </span>
          </Link>
          <Link to={continueUrl} className="entry-card">
            <span className="entry-number">III</span>
            <Glyph id="door" />
            <h2>
              {draftLength
                ? text(language, "继续映照自我", "Continue your assessment")
                : recentChapter
                  ? text(language, "继续查阅线索", "Return to your clue")
                  : recent
                    ? text(language, "续写探索", "Continue exploring")
                    : text(language, "寻回线索", "Recover a clue")}
            </h2>
            <p>
              {draftLength
                ? text(
                    language,
                    `你的选择已经走过 ${draftLength} 个情境。下一页，仍在等你。`,
                    `You have completed ${draftLength} situations. Your next choice awaits.`,
                  )
                : recentChapter
                  ? text(
                      language,
                      `继续查阅第 ${recentChapter.number} 章，接着追溯其中的线索。`,
                      `Return to chapter ${recentChapter.number}. Continue following its clues.`,
                    )
                  : recent
                    ? text(
                        language,
                        `上次，你在「${pathwayLabel(recent, language)}」驻足。灰雾仍为你留着入口。`,
                        `Your last stop was ${pathwayLabel(recent, language)}. Your place awaits.`,
                      )
                    : text(
                        language,
                        "从一段记忆、一句疑问出发，寻找有出处的章节与线索。",
                        "Begin with a memory or a question. Find chapters with traceable sources.",
                      )}
            </p>
            <span className="text-link">
              {draftLength || recentChapter
                ? text(language, "继续上次探索", "Continue where you left off")
                : recent
                  ? text(language, "继续探索", "Return to your path")
                  : text(language, "打开档案", "Open the archives")}{" "}
              ↗
            </span>
          </Link>
        </div>
      </section>
      <section className="editorial-note">
        <span>◇</span>
        <p>
          {text(
            language,
            "从凡人的直觉，到神性的权柄。\n升格的每一步，都意味着理解与代价。",
            "From mortal intuition to divine authority.\nEvery step upward asks for understanding—and a price.",
          )}
        </p>
        <Link to="/directory">
          {text(language, "阅读序列与升格", "Read the Sequences")} →
        </Link>
      </section>
    </>
  );
}
