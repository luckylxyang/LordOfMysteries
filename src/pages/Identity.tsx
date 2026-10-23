import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { pathways } from "../data/canon";
import {
  resolvePathway,
  pathwayLabel,
  traitNames,
  questions,
  text,
  type Trait,
  pathwayProfile,
  RULE_VERSION,
} from "../domain/exploration";
import { useLanguage } from "../i18n/LanguageContext";
import { useArchive } from "../state/archive";
import IdentityCard from "../components/IdentityCard";
import { identityArt } from "../data/identityArt";
import "./Identity.css";
import { exportIdentityCard } from "../utils/identityCard";
import { track } from "../utils/telemetry";
export default function Identity() {
  const { session } = useArchive();
  const [params] = useSearchParams();
  return (
    <IdentityView
      key={`${session?.user.id || "guest"}:${params.get("shared") === "1" ? "shared" : "own"}`}
    />
  );
}
function IdentityView() {
  const navigate = useNavigate();
  const { pathwayId } = useParams();
  const [params] = useSearchParams();
  const { language } = useLanguage();
  const { archive, update } = useArchive();
  const p = resolvePathway(pathwayId);
  const snapshot = archive.history.find(
    (h) => h.id === params.get("record") && h.scores[0]?.id === p?.id,
  );
  const shared = params.get("shared") === "1";
  const [nickname, setNickname] = useState(shared ? "" : archive.nickname);
  useEffect(() => {
    if (!shared) setNickname(archive.nickname);
  }, [archive.nickname, shared]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const commentary =
    snapshot?.commentary[language] ||
    text(
      language,
      "每一次选择，都是探索的起点。",
      "Every choice is a beginning.",
    );
  useEffect(() => {
    if (params.get("shared") === "1" && p) track("share_landing", p.id);
  }, [p?.id, params]);
  if (!p)
    return (
      <div className="empty-state">
        <h1>
          {text(
            language,
            "这份旧身份需要重新评估",
            "This legacy identity needs a new assessment",
          )}
        </h1>
        <p>
          {text(
            language,
            "无法可靠地将这条旧途径映射到原著设定。",
            "We cannot reliably map this legacy pathway to the original setting.",
          )}
        </p>
        <Link className="button primary" to="/quiz">
          {text(language, "重新评估", "Retake assessment")}
        </Link>
      </div>
    );
  const download = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const blob = await exportIdentityCard(
        p,
        nickname,
        commentary,
        language,
        !!snapshot,
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lotm-${p.id}-identity.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      track("card_download", p.id);
      setStatus(text(language, "身份卡已生成。", "Your card is ready."));
    } catch {
      setStatus(
        text(language, "导出失败，请重试。", "Export failed. Please retry."),
      );
    } finally {
      setBusy(false);
    }
  };
  const share = async () => {
    const url = `${location.origin}/result/${p.id}?shared=1`;
    track("share_attempt", p.id);
    try {
      if (navigator.share)
        await navigator.share({
          title: language === "zh" ? "我的非凡途径" : "My Beyonder pathway",
          text: text(
            language,
            "探索你的非凡途径。",
            "Discover your Beyonder pathway.",
          ),
          url,
        });
      else await navigator.clipboard.writeText(url);
      setStatus(
        text(language, "分享链接已准备好。", "Your share link is ready."),
      );
    } catch (e) {
      if ((e as Error).name !== "AbortError") setStatus(url);
    }
  };
  return (
    <div className="identity-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR BEYONDER IDENTITY</span>
          <h1>
            {text(
              language,
              "灰雾回应了你的选择。",
              "The fog answers your choices.",
            )}
          </h1>
          <p>
            {snapshot
              ? text(
                  language,
                  "已保存的测评快照 · 娱乐倾向",
                  "Saved assessment snapshot · fictional affinity",
                )
              : text(
                  language,
                  "通用途径展示 · 未包含个人答题记录",
                  "General pathway preview · no personal answers included",
                )}
          </p>
        </div>
      </div>
      <div className="identity-layout">
        <div className="identity-art-stage">
          <div className="identity-edition" aria-hidden="true">
            BEYONDER ARCHIVE / {p.id.toUpperCase().replace(/-/g, " ")}
          </div>
          <IdentityCard
            key={p.id}
            path={p}
            nickname={nickname}
            commentary={commentary}
            language={language}
            assessed={!!snapshot}
            onReady={setCardReady}
          />
        </div>
        <div className="identity-tools">
          <div className="eyebrow">
            {snapshot
              ? text(language, "理解你的回响", "UNDERSTAND YOUR AFFINITY")
              : text(language, "为自己选择身份", "CHOOSE AN IDENTITY")}
          </div>
          <div className="identity-path-summary">
            <h2>{pathwayLabel(p, language)}</h2>
            <p>{identityArt[p.id].motif[language]}</p>
            <span>
              {text(language, "序列 9", "SEQUENCE 9")} · {p.entry[language]}
            </span>
          </div>
          {!snapshot && <p>{commentary}</p>}
          <label className="identity-path-select">
            {text(
              language,
              "浏览其他途径的身份卡",
              "Explore another pathway card",
            )}
            <select
              value={p.id}
              onChange={(e) => {
                setStatus("");
                setCardReady(false);
                navigate(
                  `/result/${e.target.value}${shared ? "?shared=1" : ""}`,
                );
              }}
            >
              {pathways.map((path) => (
                <option key={path.id} value={path.id}>
                  {path.name[language]} · {path.entry[language]}
                </option>
              ))}
            </select>
          </label>
          {snapshot && (
            <>
              <p>{commentary}</p>
              <div className="affinity-bars">
                {snapshot.scores.slice(0, 3).map((score, i) => {
                  const path = pathways.find((x) => x.id === score.id);
                  return (
                    path && (
                      <div key={score.id}>
                        <div>
                          <span>
                            {i === 0
                              ? text(language, "主要倾向", "Primary")
                              : text(language, "次要倾向", "Secondary")}{" "}
                            · {pathwayLabel(path, language)}
                          </span>
                          <span>{score.score}/100</span>
                        </div>
                        <div className="affinity-track">
                          <i
                            style={{
                              width: `${score.score}%`,
                              background: path.color,
                            }}
                          />
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
              {snapshot.version === RULE_VERSION && (
                <details className="rule-explanation">
                  <summary>
                    {text(
                      language,
                      "查看匹配规则与编辑画像",
                      "View matching rules and editorial profile",
                    )}
                  </summary>
                  <p>
                    {text(
                      language,
                      "八个情境分成两组，每组提供四次选择。每个维度的选择次数除以四，与途径编辑画像的比例比较；整体距离越近，匹配分数越高。画像用于娱乐探索，不是原著对人的分类，也不是统计概率。",
                      "Eight situations form two groups with four choices each. Choice counts divided by four are compared with an editorial pathway profile. A smaller overall distance gives a higher score. Profiles support entertainment, not psychological categories or probabilities.",
                    )}
                  </p>
                  <table className="profile-table">
                    <thead>
                      <tr>
                        <th>{text(language, "选择维度", "Dimension")}</th>
                        <th>{text(language, "你的选择", "Your choices")}</th>
                        <th>
                          {text(language, "主要途径画像", "Primary profile")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Object.keys(traitNames) as Trait[]).map((trait) => (
                        <tr key={trait}>
                          <th>{traitNames[trait][language]}</th>
                          <td>{snapshot.traits[trait]}/4</td>
                          <td>
                            {Math.round(pathwayProfile(p.id)[trait] * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              )}
              <p className="small-copy muted">
                {text(language, "规则版本：", "Rule version: ")}
                {snapshot.version}
              </p>
              <small>
                {text(
                  language,
                  "分数是规则匹配度，不是概率；平分按固定途径 ID 排序。",
                  "Scores measure editorial fit, not probability. Ties use stable pathway IDs.",
                )}
                {snapshot.scores[0].score - snapshot.scores[1].score <= 5 &&
                  text(
                    language,
                    " 前两项接近，你可能同时对两条途径产生共鸣。",
                    " The leading affinities are close; both may resonate.",
                  )}
              </small>
              <details>
                <summary>
                  {text(
                    language,
                    "哪些选择影响了结果？",
                    "Which choices shaped the result?",
                  )}
                </summary>
                {snapshot.answers.map((answer, i) => {
                  const option = questions[i]?.options[answer];
                  return (
                    option && (
                      <p key={i}>
                        {i + 1}. {option.label[language]} →{" "}
                        {traitNames[option.trait as Trait][language]}
                      </p>
                    )
                  );
                })}
              </details>
            </>
          )}
          <label>
            {text(language, "身份卡上的昵称", "Name on your identity card")}
            <input
              value={nickname}
              maxLength={40}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={text(language, "寻途者", "Seeker")}
            />
          </label>
          <button
            className="button primary"
            disabled={busy || !cardReady}
            onClick={download}
          >
            {text(
              language,
              busy ? "正在绘制…" : "下载高清身份卡",
              busy ? "Rendering…" : "Download identity card",
            )}{" "}
            ↓
          </button>
          <button
            className="button ghost"
            onClick={() => {
              update((a) => ({ ...a, nickname, chosenPathway: p.id }));
              setStatus(
                text(language, "已保存到我的身份。", "Saved to your identity."),
              );
            }}
          >
            {text(
              language,
              "将此途径设为我的身份",
              "Choose this as my identity",
            )}
          </button>
          <button className="text-button" onClick={share}>
            {text(language, "分享通用途径链接", "Share general pathway link")} ↗
          </button>
          <p className="small-copy muted">
            {text(
              language,
              "链接展示途径，不包含你的昵称或答案。下载图片包含昵称，请自行选择分享。",
              "The link contains no nickname or answers. The downloaded image includes your nickname.",
            )}
          </p>
          <p role="status" className="status-text">
            {status}
          </p>
          <div className="inline-links">
            <Link to={`/pathways/${p.id}`}>
              {text(language, "探索这条途径", "Explore this path")} →
            </Link>
            <Link to="/quiz">{text(language, "重新评估", "Retake")}</Link>
            <Link to="/profile">
              {text(language, "我的档案", "My archive")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
