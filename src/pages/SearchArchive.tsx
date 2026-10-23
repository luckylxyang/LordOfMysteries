import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { useArchive } from "../state/archive";
import { text } from "../domain/exploration";
import {
  chapterIndex,
  reviewedChapterNumbers,
  searchChapters,
} from "../data/chapterIndex";
import { Reveal } from "../components/Mystic";
import { track } from "../utils/telemetry";
export default function SearchArchive() {
  const { language } = useLanguage();
  const { archive, favorite, visit } = useArchive();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [results, setResults] = useState(() =>
    params.get("q") ? searchChapters(params.get("q")!) : [],
  );
  const [searched, setSearched] = useState(!!params.get("q"));
  function search() {
    if (!query.trim()) return;
    const found = searchChapters(query);
    setResults(found);
    setSearched(true);
    track(found.length ? "search_results" : "search_empty");
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE DOCUMENT ROOM</span>
          <h1>
            {text(
              language,
              "循着线索，找到那一章。",
              "Follow a clue to its chapter.",
            )}
          </h1>
          <p>
            {text(
              language,
              "核对过的章节线索，附上可以追溯的出处。",
              "Curated chapter clues with traceable sources.",
            )}
          </p>
        </div>
      </div>
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <label htmlFor="plot-query">
          {text(
            language,
            "章节号、人物或情节",
            "Chapter number, character or event",
          )}
        </label>
        <div className="search-bar">
          <input
            id="plot-query"
            maxLength={500}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={text(
              language,
              "例如：第一次聚会、观众、灰雾",
              "Try: first meeting, Spectator, gray fog",
            )}
          />
          <button className="button primary" disabled={!query.trim()}>
            {text(language, "查找线索", "Find clues")}
          </button>
        </div>
      </form>
      <p className="small-copy muted">
        {text(
          language,
          `覆盖 ${chapterIndex.length} 个已核对章号与标题，其中第 ${reviewedChapterNumbers.join("、")} 章含已核对的情节摘要。章号依据 Webnovel 官方英文版，中文标题为本站译名。其余条目仅匹配章号与标题；没有把未核实的旧摘要带入检索。`,
          `Coverage: ${chapterIndex.length} checked chapter numbers and titles; chapters ${reviewedChapterNumbers.join(", ")} also have reviewed plot summaries. Numbers follow Webnovel’s English edition; Chinese titles are editorial translations. Other entries match titles and numbers only. Unverified legacy summaries are excluded.`,
        )}
      </p>
      <div className="search-results">
        {results.map(({ chapter: c, matches }) => (
          <article className="search-result" key={c.number}>
            <span className="eyebrow">
              CHAPTER {String(c.number).padStart(3, "0")}
            </span>
            {c.number > archive.reading.chapter ? (
              <Reveal
                key={`${c.number}-${archive.reading.chapter}`}
                label={text(
                  language,
                  `第 ${c.number} 章超出当前阅读进度`,
                  `Chapter ${c.number} is beyond your reading progress`,
                )}
              >
                <Chapter chapter={c} matches={matches} />
              </Reveal>
            ) : (
              <Chapter chapter={c} matches={matches} />
            )}
          </article>
        ))}
      </div>
      {searched && !results.length && (
        <div className="empty-state">
          <h2>
            {text(
              language,
              "当前索引中没有可靠匹配",
              "No reliable match in this index",
            )}
          </h2>
          <p>
            {text(
              language,
              "可以缩短关键词，或尝试章节号与人物名。",
              "Try a shorter keyword, chapter number or character name.",
            )}
          </p>
        </div>
      )}
    </>
  );
  function Chapter({
    chapter: c,
    matches,
  }: {
    chapter: (typeof chapterIndex)[number];
    matches: string[];
  }) {
    return (
      <>
        <h2>{c.title[language]}</h2>
        <span className="content-tag">
          {text(
            language,
            c.review === "summary"
              ? "已核对情节摘要"
              : "仅标题索引 · 摘要待核对",
            c.review === "summary"
              ? "Reviewed plot summary"
              : "Title index only · summary pending",
          )}
        </span>
        <p>{c.summary[language]}</p>
        <p className="small-copy">
          {text(language, "匹配依据：", "Matched: ")}
          {matches.join(" · ") || text(language, "章节号", "Chapter number")}
        </p>
        <div className="inline-links">
          <a href={c.url} target="_blank" rel="noreferrer">
            {text(
              language,
              "Webnovel 官方英文版 · 查看原章（可能含剧透）",
              "Webnovel official edition · Read chapter (spoilers)",
            )}{" "}
            ↗
          </a>
          <button
            className="text-button"
            onClick={() => {
              favorite(`ch:${c.number}`);
              visit(`ch:${c.number}`);
            }}
            aria-pressed={archive.favorites.includes(`ch:${c.number}`)}
          >
            {archive.favorites.includes(`ch:${c.number}`) ? "★" : "☆"}{" "}
            {text(language, "收藏资料", "Save entry")}
          </button>
        </div>
      </>
    );
  }
}
