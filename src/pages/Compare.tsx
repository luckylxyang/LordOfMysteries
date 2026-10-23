import { Link, useSearchParams } from "react-router-dom";
import { pathways } from "../data/canon";
import { useLanguage } from "../i18n/LanguageContext";
import { pathwayLabel, text, stage } from "../domain/exploration";
import { Glyph, SourceLinks, FieldSource } from "../components/Mystic";
export default function Compare() {
  const [params] = useSearchParams();
  const { language } = useLanguage();
  const selected = [...new Set((params.get("ids") || "").split(","))]
    .map((id) => pathways.find((p) => p.id === id))
    .filter((p) => !!p)
    .slice(0, 3);
  return (
    <>
      <Link className="back-link" to="/directory">
        ← {text(language, "返回星图", "Back to atlas")}
      </Link>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            DIFFERENT PATHS / DIFFERENT POSSIBILITIES
          </span>
          <h1>{text(language, "并观途径", "Paths in perspective")}</h1>
          <p>
            {text(
              language,
              "从相同序列出发，看见不同的成长方向。",
              "At the same Sequence, different possibilities unfold.",
            )}
          </p>
        </div>
      </div>
      {selected.length >= 2 && (
        <p className="comparison-hint">
          {text(
            language,
            "左右滑动，比较不同途径。",
            "Swipe sideways to compare pathways.",
          )}
        </p>
      )}
      {selected.length < 2 ? (
        <div className="empty-state">
          <p>
            {text(
              language,
              "请从星图选择 2—3 条途径进行比较。",
              "Choose 2–3 pathways in the atlas to compare.",
            )}
          </p>
          <Link className="button primary" to="/directory">
            {text(language, "选择途径", "Choose pathways")}
          </Link>
        </div>
      ) : (
        <div
          className="comparison-grid"
          style={
            {
              "--columns": selected.length,
              "--compare-rows": 13,
            } as React.CSSProperties
          }
        >
          {selected.map((p) => (
            <article
              className="comparison-column"
              key={p.id}
              style={{ "--path-color": p.color } as React.CSSProperties}
            >
              <div className="comparison-head">
                <Glyph id={p.id} />
                <h2>{pathwayLabel(p, language)}</h2>
                <Link to={`/pathways/${p.id}`}>
                  {text(language, "查看详情", "Open pathway")} ↗
                </Link>
              </div>
              <section>
                <h3>{text(language, "权柄主题", "Authority")}</h3>
                <p>{p.domain[language]}</p>
              </section>
              {p.sequences
                .slice()
                .sort((a, b) => b.level - a.level)
                .map((s) => (
                  <section key={s.level} data-sequence={s.level}>
                    <span className="eyebrow">
                      {stage(s.level, language)} / {s.level}
                    </span>
                    <h3>{s.name[language]}</h3>
                    <>
                      <p>{s.ability[language]}</p>
                      <FieldSource
                        evidence={s.evidence.ability}
                        label={text(language, "能力出处", "Ability source")}
                      />
                      <small>{s.advancement[language]}</small>
                      <FieldSource
                        evidence={s.evidence.advancement}
                        label={text(language, "晋升出处", "Advancement source")}
                      />
                      <h4>{text(language, "扮演方式", "Acting principles")}</h4>
                      <small>{s.acting[language]}</small>
                      <FieldSource
                        evidence={s.evidence.acting}
                        label={text(language, "扮演出处", "Acting source")}
                      />
                    </>
                  </section>
                ))}
              <SourceLinks ids={p.sourceIds} />
            </article>
          ))}
        </div>
      )}
    </>
  );
}
