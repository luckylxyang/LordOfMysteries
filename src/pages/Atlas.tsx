import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { pathways, groups } from "../data/canon";
import { useLanguage } from "../i18n/LanguageContext";
import { useArchive } from "../state/archive";
import { pathwayLabel, text } from "../domain/exploration";
import {
  Glyph,
  StarMap,
  PathwayCard,
  Reveal,
  SourceLinks,
} from "../components/Mystic";

export default function Atlas() {
  const { language } = useLanguage();
  const { archive, session } = useArchive();
  const [params, setParams] = useSearchParams();
  const selected = params.get("path") || "fool";
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");
  const [compared, setCompared] = useState<string[]>([]);
  const scope = `${session?.user.id || "guest"}:${archive.reading.floor}:${archive.reading.chapter}`;
  const [relationScope, setRelationScope] = useState<string | null>(null);
  const relations = archive.reading.floor === 0 || relationScope === scope;
  const p = pathways.find((p) => p.id === selected) || pathways[0];
  const group = groups.find((g) => g.id === p.group);
  const select = (id: string) => {
    setParams({ path: id }, { replace: true });
  };
  const toggle = (id: string) =>
    setCompared((a) =>
      a.includes(id)
        ? a.filter((x) => x !== id)
        : a.length < 3
          ? [...a, id]
          : a,
    );
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE BEYONDER ATLAS</span>
          <h1>
            {text(language, "途径之间，万象相连。", "Everything is connected.")}
          </h1>
          <p>
            {text(
              language,
              "选择一颗星，追溯它的起点、权柄与升格。",
              "Choose a star. Trace its beginning, authority and ascent.",
            )}
          </p>
        </div>
        <span className="folio">XXII / 22</span>
      </div>
      <section className="atlas-observatory">
        <StarMap selected={p.id} onSelect={select} relations={relations} />
        <aside
          className="atlas-inspector"
          style={{ "--path-color": p.color } as React.CSSProperties}
        >
          <div className="eyebrow">SELECTED PATHWAY</div>
          <Glyph id={p.id} size={76} />
          <h2>{pathwayLabel(p, language, archive.reading.floor)}</h2>
          <p>
            {archive.reading.floor === 0
              ? p.summary[language]
              : p.sequences.find((s) => s.level === 9)?.ability[language]}
          </p>
          <Link className="button primary" to={`/pathways/${p.id}`}>
            {text(language, "追溯升格之路", "Trace the ascent")} ↗
          </Link>
          <div className="inspector-relations">
            {relations ? (
              <>
                <span className="eyebrow">
                  {text(language, "相邻途径 · 关联组", "NEIGHBORING PATHWAYS")}
                </span>
                <h3>{group?.name[language]}</h3>
                <p>{group?.theme[language]}</p>
                <div className="chips">
                  {pathways
                    .filter((x) => x.group === p.group && x.id !== p.id)
                    .map((x) => (
                      <button key={x.id} onClick={() => select(x.id)}>
                        {pathwayLabel(x, language, archive.reading.floor)}
                      </button>
                    ))}
                  {pathways.filter((x) => x.group === p.group).length === 1 && (
                    <small>
                      {text(
                        language,
                        "在这 22 条途径中，没有同组的其他途径。",
                        "No other path in this set belongs to this group.",
                      )}
                    </small>
                  )}
                </div>
                <small>
                  {text(
                    language,
                    "关联不等于任意转换；转换条件需按原著另行核对。",
                    "A connection does not imply unrestricted switching.",
                  )}
                </small>
                <SourceLinks ids={p.sourceIds} />
              </>
            ) : (
              <Reveal>
                <button
                  className="button ghost"
                  onClick={() => setRelationScope(scope)}
                >
                  {text(language, "点亮途径关联", "Illuminate the connections")}
                </button>
              </Reveal>
            )}
          </div>
        </aside>
      </section>
      <section className="catalog-section">
        <div className="section-row">
          <h2>{text(language, "二十二条起点", "Twenty-two beginnings")}</h2>
          <label className="search-field">
            <span>⌕</span>
            <input
              aria-label={text(language, "搜索途径", "Search pathways")}
              placeholder={text(language, "寻找途径…", "Find a pathway…")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        {relations && (
          <div className="filter-chips">
            <button aria-pressed={!filter} onClick={() => setFilter("")}>
              {text(language, "全部", "All")}
            </button>
            {groups.map((g) => (
              <button
                key={g.id}
                aria-pressed={filter === g.id}
                onClick={() => setFilter(g.id)}
              >
                {g.name[language]}
              </button>
            ))}
          </div>
        )}
        <div className="path-grid">
          {pathways
            .filter(
              (x) =>
                (!relations || !filter || x.group === filter) &&
                pathwayLabel(x, language, archive.reading.floor)
                  .toLowerCase()
                  .includes(query.toLowerCase()),
            )
            .map((x) => (
              <PathwayCard
                key={x.id}
                p={x}
                action={
                  <button
                    className="compare-toggle"
                    aria-pressed={compared.includes(x.id)}
                    disabled={compared.length === 3 && !compared.includes(x.id)}
                    onClick={() => toggle(x.id)}
                  >
                    {compared.includes(x.id) ? "✓" : "+"}{" "}
                    {text(language, "比较", "Compare")}
                  </button>
                }
              />
            ))}
        </div>
      </section>
      {compared.length > 0 && (
        <div className="compare-dock" role="status">
          <span>
            {text(
              language,
              `已选择 ${compared.length}/3 条途径`,
              `Selected ${compared.length}/3 pathways`,
            )}
          </span>
          <Link
            className={`button primary small ${compared.length < 2 ? "disabled" : ""}`}
            aria-disabled={compared.length < 2}
            onClick={(e) => {
              if (compared.length < 2) e.preventDefault();
            }}
            to={`/compare?ids=${compared.join(",")}`}
          >
            {text(language, "并排比较", "Compare")} →
          </Link>
          <button
            className="icon-button"
            onClick={() => setCompared([])}
            aria-label={text(language, "清空比较", "Clear comparison")}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
