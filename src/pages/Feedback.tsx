import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { text } from "../domain/exploration";
import { requestService } from "../utils/service";
export default function Feedback() {
  const { language } = useLanguage();
  const [params] = useSearchParams();
  const [contentId, setContentId] = useState(params.get("content") || "");
  const [category, setCategory] = useState("correction");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit() {
    if (busy || !message.trim()) return;
    setBusy(true);
    try {
      const result = await requestService("feedback", {
        contentId,
        category,
        message,
        requestId: crypto.randomUUID(),
      });
      setStatus(
        text(
          language,
          `反馈已保存，编号 ${result.id}。`,
          `Feedback saved. Reference: ${result.id}.`,
        ),
      );
      setMessage("");
    } catch {
      try {
        localStorage.setItem(
          "lotm.feedback.draft",
          JSON.stringify({ contentId, category, message }),
        );
        setStatus(
          text(
            language,
            "提交未成功，草稿已保存在当前设备。请稍后重试。",
            "Submission failed. A draft is saved on this device; please retry.",
          ),
        );
      } catch {
        setStatus(
          text(
            language,
            "提交失败，请复制内容后重试。",
            "Submission failed. Copy your message before retrying.",
          ),
        );
      }
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="feedback-page">
      <span className="eyebrow">HELP KEEP THE ARCHIVE TRUE</span>
      <h1>{text(language, "留下你的线索", "Leave us a clue")}</h1>
      <p>
        {text(
          language,
          "欢迎指出资料错误、搜索遗漏或体验问题。引用章号与来源，会让核对更容易。请勿填写密码或其他敏感信息。",
          "Report a correction, missing search entry or experience issue. Chapter numbers and source links help us review it. Please omit passwords and sensitive information.",
        )}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <label>
          {text(language, "反馈类型", "Type")}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="correction">
              {text(language, "资料纠错", "Correction")}
            </option>
            <option value="search">
              {text(language, "搜索遗漏", "Missing search result")}
            </option>
            <option value="experience">
              {text(language, "体验问题", "Experience issue")}
            </option>
          </select>
        </label>
        <label>
          {text(language, "内容编号或页面", "Content ID or page")}
          <input
            value={contentId}
            maxLength={100}
            onChange={(e) => setContentId(e.target.value)}
          />
        </label>
        <label>
          {text(language, "说明与出处", "Details and source")}
          <textarea
            rows={7}
            maxLength={2000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button className="button primary" disabled={busy || !message.trim()}>
          {text(
            language,
            busy ? "正在提交…" : "提交反馈",
            busy ? "Submitting…" : "Submit feedback",
          )}
        </button>
        <button
          className="text-button"
          type="button"
          onClick={() => {
            try {
              const draft = JSON.parse(
                localStorage.getItem("lotm.feedback.draft") || "null",
              );
              if (draft) {
                setMessage(String(draft.message || "").slice(0, 2000));
                setContentId(String(draft.contentId || "").slice(0, 100));
              }
            } catch {
              /* Invalid draft ignored. */
            }
          }}
        >
          {text(language, "恢复本地草稿", "Restore local draft")}
        </button>
      </form>
      <p role="status">{status}</p>
    </div>
  );
}
