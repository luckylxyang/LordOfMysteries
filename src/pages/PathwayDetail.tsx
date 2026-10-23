import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { pathways, actingMethod } from "../data/canon";
import { useLanguage } from "../i18n/LanguageContext";
import { useArchive } from "../state/archive";
import {
  canRead,
  pathwayLabel,
  resolvePathway,
  stage,
  text,
} from "../domain/exploration";
import {
  Glyph,
  Reveal,
  SourceLinks,
  GroupName,
  useRevealScope,
  FieldSource,
} from "../components/Mystic";
import { track } from "../utils/telemetry";

export default function PathwayDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const { archive, favorite, visit } = useArchive();
  const p = resolvePathway(id);
  const [level, setLevel] = useState(9);
  const scope = useRevealScope();
  const [revealedScope, setRevealedScope] = useState<string | null>(null);
  useEffect(() => {
    if (p) {
      visit(p.id);
      track("pathway_view", p.id);
    }
    setLevel(9);
    setRevealedScope(null);
  }, [p?.id, visit]);
  if (!p)
    return (
      <div className="empty-state">
        <h1>
          {text(
            language,
            "旧途径需要重新确认",
            "This old pathway needs a fresh assessment",
          )}
        </h1>
        <p>
          {text(
            language,
            "这条旧记录无法可靠对应原著途径。请重新评估，或从已核对的图鉴选择。",
            "This legacy record cannot be reliably mapped. Retake the assessment or choose from the atlas.",
          )}
        </p>
        <Link className="button primary" to="/quiz">
          {text(language, "重新评估", "Retake assessment")}
        </Link>
      </div>
    );
  const s = p.sequences.find((s) => s.level === level)!;
  const allowed =
    canRead(level, archive.reading) || revealedScope === `${scope}:${level}`;
  return (
    <div
      className="detail-page"
      style={
        {
          "--path-color": p.color,
          "--ascent": (9 - level) / 9,
        } as React.CSSProperties
      }
    >
      <Link className="back-link" to="/directory">
        ← {text(language, "返回途径星图", "Back to the atlas")}
      </Link>
      <div className="detail-heading">
        <div>
          <span className="eyebrow">
            PATHWAY / {String(pathways.indexOf(p) + 1).padStart(2, "0")}
          </span>
          <h1>{pathwayLabel(p, language, archive.reading.floor)}</h1>
          <p>
            {archive.reading.floor === 0
              ? p.summary[language]
              : p.sequences.find((s) => s.level === 9)?.ability[language]}
          </p>
        </div>
        <button
          className="button ghost small"
          onClick={() => favorite(p.id)}
          aria-pressed={archive.favorites.includes(p.id)}
        >
          {archive.favorites.includes(p.id) ? "★" : "☆"}{" "}
          {text(
            language,
            archive.favorites.includes(p.id) ? "已收藏" : "收藏途径",
            archive.favorites.includes(p.id) ? "Saved" : "Save pathway",
          )}
        </button>
      </div>
      <section className="ascent-layout">
        <nav
          className="sequence-ladder"
          aria-label={text(language, "选择序列", "Choose a Sequence")}
        >
          <div className="eyebrow">
            {text(language, "由凡人，向神性", "FROM MORTAL TO DIVINE")}
          </div>
          {p.sequences
            .slice()
            .sort((a, b) => b.level - a.level)
            .map((seq) => (
              <button
                key={seq.level}
                onClick={() => {
                  setLevel(seq.level);
                  setRevealedScope(null);
                }}
                className={seq.level === level ? "active" : ""}
                aria-pressed={seq.level === level}
              >
                <span className="sequence-number">
                  {String(seq.level).padStart(2, "0")}
                </span>
                <span>
                  <small>{stage(seq.level, language)}</small>
                  <strong>
                    {canRead(seq.level, archive.reading)
                      ? seq.name[language]
                      : text(language, "灰雾封存", "Veiled by the fog")}
                  </strong>
                </span>
                <span className="ladder-diamond">◇</span>
              </button>
            ))}
        </nav>
        <div className="sequence-revelation">
          <div className="ascension-art" aria-hidden="true">
            <div className="ascent-pulse" key={level} />
            <div className="ascension-ring ring-one" />
            <div className="ascension-ring ring-two" />
            <div className="ascension-ring ring-three" />
            <div className="ascent-axis" />
            <Glyph id={p.id} size={150} />
            <span className="ascent-numeral">
              {String(level).padStart(2, "0")}
            </span>
          </div>
          <div className="sequence-content" key={`${p.id}-${level}-${allowed}`}>
            <span className="eyebrow">
              SEQUENCE {String(level).padStart(2, "0")} /{" "}
              {stage(level, language)}
            </span>
            {allowed ? (
              <>
                <h2>{s.name[language]}</h2>
                <FieldSource
                  evidence={s.evidence.name}
                  label={text(language, "名称出处", "Name source")}
                />
                <div className="detail-section">
                  <h3>
                    {text(language, "能力与权柄", "Abilities & authority")}
                  </h3>
                  <p>{s.ability[language]}</p>
                  <FieldSource
                    evidence={s.evidence.ability}
                    label={text(language, "能力出处", "Ability source")}
                  />
                </div>
                <div className="detail-section">
                  <h3>{text(language, "升格条件", "Advancement")}</h3>
                  <p>{s.advancement[language]}</p>
                  <small>
                    {text(
                      language,
                      "资料阅读不代表角色已晋升；此处展示原著序列结构。",
                      "Reading this entry does not advance your identity. This is a reference to the novel’s structure.",
                    )}
                  </small>
                  <FieldSource
                    evidence={s.evidence.advancement}
                    label={text(language, "晋升出处", "Advancement source")}
                  />
                </div>
                <div className="detail-section">
                  <h3>{text(language, "扮演方式", "Acting principles")}</h3>
                  <p>{s.acting[language]}</p>
                  <FieldSource
                    evidence={s.evidence.acting}
                    label={text(language, "扮演出处", "Acting source")}
                  />
                </div>
                {s.evidence.ability.status === "pending" && (
                  <p className="muted small-copy">
                    {text(
                      language,
                      "该条目仍有待核对字段，详见来源说明。",
                      "Some details await verification; see the source notes.",
                    )}
                  </p>
                )}
              </>
            ) : (
              <div className="sealed">
                <h2>
                  {text(
                    language,
                    "秘密仍在灰雾之后",
                    "A secret behind the fog",
                  )}
                </h2>
                <p>
                  {text(
                    language,
                    "这个序列超出你设置的可见范围。",
                    "This Sequence is beyond your chosen reading depth.",
                  )}
                </p>
                <button
                  className="button ghost"
                  onClick={() => setRevealedScope(`${scope}:${level}`)}
                >
                  {text(
                    language,
                    "知晓剧透，临时展开",
                    "Reveal this spoiler for now",
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="ascent-controls">
            <button
              className="button ghost small"
              disabled={level === 9}
              onClick={() => {
                setLevel((x) => x + 1);
                setRevealedScope(null);
              }}
            >
              ← {text(language, "上一阶", "Previous")}
            </button>
            <button
              className="button primary small"
              disabled={level === 0}
              onClick={() => {
                setLevel((x) => x - 1);
                setRevealedScope(null);
              }}
            >
              {text(language, "向上探索", "Ascend")} ↑
            </button>
          </div>
        </div>
      </section>
      <section className="acting-context">
        <span className="eyebrow">ACTING / DIGESTION</span>
        <h2>{text(language, "成长，也是一场扮演", "Growth through acting")}</h2>
        {archive.reading.chapter >= 21 ? (
          <>
            <p>{actingMethod.content[language]}</p>
            <SourceLinks ids={actingMethod.sourceIds} />
          </>
        ) : (
          <Reveal
            label={text(
              language,
              "涉及第 21 章的魔药知识",
              "Potion knowledge introduced in chapter 21",
            )}
          >
            <p>{actingMethod.content[language]}</p>
            <SourceLinks ids={actingMethod.sourceIds} />
          </Reveal>
        )}
      </section>
      <section className="related-section">
        <div className="section-row">
          <h2>
            {text(language, "权柄在何处交汇", "Where authorities converge")}
          </h2>
          <Link to={`/directory?path=${p.id}`}>
            {text(language, "在星图中查看", "View in the atlas")} ↗
          </Link>
        </div>
        {archive.reading.floor === 0 ? (
          <Relations id={p.id} />
        ) : (
          <Reveal>
            <Relations id={p.id} />
          </Reveal>
        )}
      </section>
      <div className="detail-next">
        <p>
          {text(
            language,
            "这条途径，是否与你产生共鸣？",
            "Does this pathway resonate with you?",
          )}
        </p>
        <Link className="button primary" to="/quiz">
          {text(language, "发现我的途径", "Discover my pathway")} ↗
        </Link>
      </div>
    </div>
  );
}
function Relations({ id }: { id: string }) {
  const p = pathways.find((p) => p.id === id)!;
  const { language } = useLanguage();
  return (
    <div className="relation-summary">
      <div>
        <span className="eyebrow">
          {text(language, "同组关联", "CONNECTED GROUP")}
        </span>
        <h3>
          <GroupName id={p.group} />
        </h3>
        <p>{p.domain[language]}</p>
        <SourceLinks ids={p.sourceIds} />
      </div>
      <div className="relation-paths">
        {pathways
          .filter((x) => x.group === p.group)
          .map((x) => (
            <Link key={x.id} to={`/pathways/${x.id}`}>
              <Glyph id={x.id} />
              <span>{x.name[language]}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
