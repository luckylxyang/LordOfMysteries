import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { questions, evaluate, text } from "../domain/exploration";
import { useLanguage } from "../i18n/LanguageContext";
import { useArchive } from "../state/archive";
import { Glyph } from "../components/Mystic";
import { track } from "../utils/telemetry";
export default function Assessment() {
  const { session } = useArchive();
  return <AssessmentSession key={session?.user.id || "guest"} />;
}
function AssessmentSession() {
  const { language } = useLanguage();
  const { session, addSnapshot } = useArchive();
  const navigate = useNavigate();
  const key = `lotm.assessment.${session?.user.id || "guest"}`;
  const [answers, setAnswers] = useState<number[]>(() => {
    try {
      const v = JSON.parse(sessionStorage.getItem(key) || "[]");
      return Array.isArray(v) &&
        v.length < questions.length &&
        v.every((x) => Number.isInteger(x) && x >= 0 && x < 3)
        ? v
        : [];
    } catch {
      return [];
    }
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    track("assessment_start");
  }, []);
  const q = questions[answers.length];
  const next = () => {
    if (selected === null || busy) return;
    setBusy(true);
    const result = [...answers, selected];
    if (result.length === questions.length) {
      const snapshot = evaluate(result);
      addSnapshot(snapshot);
      try {
        sessionStorage.removeItem(key);
      } catch {
        /* Storage unavailable: archive may still be exported. */
      }
      track("assessment_complete", snapshot.scores[0].id);
      navigate(`/result/${snapshot.scores[0].id}?record=${snapshot.id}`);
    } else {
      setAnswers(result);
      try {
        sessionStorage.setItem(key, JSON.stringify(result));
      } catch {
        /* Continue without draft persistence. */
      }
      setSelected(null);
      setBusy(false);
    }
  };
  return (
    <div className="assessment-page">
      <div className="assessment-intro">
        <span className="eyebrow">THE INNER MIRROR</span>
        <h1>
          {text(
            language,
            "选择之中，照见自己。",
            "See yourself in your choices.",
          )}
        </h1>
        <p>
          {text(
            language,
            "世界观娱乐评估 · 8 个情境 · 约 3 分钟",
            "A fictional-world affinity assessment · 8 situations · about 3 minutes",
          )}
        </p>
      </div>
      <div className="assessment-layout">
        <aside className="assessment-ornament">
          <div className="ornament-orbit" />
          <Glyph size={160} />
          <span>THE FOOL’S JOURNEY</span>
          <p>
            {text(
              language,
              "没有正确答案。\n只有你此刻的选择。",
              "There are no right answers.\nOnly the choices you make now.",
            )}
          </p>
        </aside>
        <section className="question-panel">
          <div className="question-progress">
            <span>
              {String(answers.length + 1).padStart(2, "0")} / {questions.length}
            </span>
            <div>
              <i
                style={{
                  width: `${((answers.length + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <div key={q.id} className="question-enter">
            <h2>{q.title[language]}</h2>
            <div
              className="answers"
              role="group"
              aria-label={q.title[language]}
            >
              {q.options.map((o, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  aria-pressed={selected === i}
                  className={selected === i ? "selected" : ""}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {o.label[language]}
                  <i>{selected === i ? "◆" : "◇"}</i>
                </button>
              ))}
            </div>
          </div>
          <div className="question-actions">
            <button
              className="text-button"
              disabled={!answers.length || busy}
              onClick={() => {
                const prev = answers.slice(0, -1);
                setSelected(answers[answers.length - 1]);
                setAnswers(prev);
                try {
                  sessionStorage.setItem(key, JSON.stringify(prev));
                } catch {
                  /* Continue without draft persistence. */
                }
              }}
            >
              ← {text(language, "上一个情境", "Previous")}
            </button>
            <button
              className="button primary"
              disabled={selected === null || busy}
              onClick={next}
            >
              {text(
                language,
                answers.length === questions.length - 1 ? "揭晓回响" : "继续",
                answers.length === questions.length - 1
                  ? "Reveal my affinity"
                  : "Continue",
              )}{" "}
              →
            </button>
          </div>
          <p className="small-copy muted">
            {text(
              language,
              "结果由公开的情境权重形成，不是心理诊断。你可以选择任何途径作为自己的身份。",
              "Results use editorial scenario weights, not psychological diagnosis. Your chosen identity is always up to you.",
            )}
          </p>
        </section>
      </div>
      <Link className="back-link" to="/directory">
        {text(language, "先了解二十二条途径", "Explore the pathways first")} ↗
      </Link>
    </div>
  );
}
