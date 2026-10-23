import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { text } from "../domain/exploration";
import { requestService, serviceFailure } from "../utils/service";
export default function Letters() {
  const { language } = useLanguage();
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [generated, setGenerated] = useState(false);
  async function send() {
    if (busy || !message.trim()) return;
    setBusy(true);
    setReply("");
    try {
      const data = await requestService("chat", {
        message,
        language,
        requestId: crypto.randomUUID(),
      });
      setReply(data.message || "");
      setGenerated(true);
      setStatus(
        text(
          language,
          `今日共享 AI 额度剩余 ${data.remaining} 次。`,
          `Shared AI allowance: ${data.remaining} requests remaining today.`,
        ),
      );
    } catch (e) {
      setGenerated(false);
      setReply(
        text(
          language,
          "今天又有人来问成功的秘诀。我想了很久，写下：先把桌上的图纸整理好，再谈改变世界。至于我自己的桌子——那是另一回事。",
          "Someone asked me the secret of success today. After much thought, I wrote: put your plans in order before changing the world. As for my own desk—that is another matter.",
        ),
      );
      setStatus(
        serviceFailure(e, language) +
          text(
            language,
            " 以下为预设同人短笺。",
            " A preset fan-written note appears below.",
          ),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="letter-page">
      <span className="eyebrow">LETTERS THROUGH THE FOG</span>
      <h1>{text(language, "一页未寄出的短笺", "An unsent page")}</h1>
      <p>
        {text(
          language,
          "罗塞尔风格的同人互动。这里的回复是原创创作，不是原著摘录，也不作为设定依据。为照顾阅读进度，仅围绕日常、创造与选择展开。",
          "A fan interaction inspired by Roselle. Replies are original fiction, not quotations or canon. Topics stay with daily life, invention and choices to avoid story spoilers.",
        )}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <label htmlFor="letter">
          {text(language, "你想问些什么？", "What would you ask?")}
        </label>
        <textarea
          id="letter"
          maxLength={500}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={text(
            language,
            "如果一项发明一直失败，该怎么办？",
            "What if an invention keeps failing?",
          )}
        />
        <button className="button primary" disabled={busy || !message.trim()}>
          {text(
            language,
            busy ? "等待回信…" : "寄出短笺",
            busy ? "Awaiting a reply…" : "Send a note",
          )}{" "}
          ↗
        </button>
      </form>
      <p className="small-copy muted">
        {text(
          language,
          "同一网络每日 20 次，与智能搜索共享，按 UTC 零点重置；已发起的上游调用即使失败也计入次数。",
          "20 requests per network each UTC day, shared with AI search. An attempted upstream call consumes a request even if it fails.",
        )}
      </p>
      <p role="status">{status}</p>
      {reply && (
        <article className="letter-reply">
          <span className="eyebrow">
            {text(
              language,
              generated ? "AI 生成 · 同人创作" : "预设文字 · 同人创作",
              generated ? "AI-GENERATED FAN FICTION" : "PRESET FAN FICTION",
            )}
          </span>
          <p>{reply}</p>
        </article>
      )}
    </div>
  );
}
