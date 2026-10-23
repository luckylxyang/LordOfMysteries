import { text, type Language } from "../domain/exploration";
import { BACKEND_ENABLED } from "../config/features";
export type ApiResult = {
  message?: string;
  keywords?: string[];
  remaining?: number;
  error?: string;
  id?: string;
  resetAt?: string;
};
export function serviceFailure(error: unknown, language: Language) {
  const e = error as { message?: string; remaining?: number; resetAt?: string };
  const reason =
    e.message === "quota"
      ? text(
          language,
          "今日 AI 额度已用完。",
          "The daily AI allowance is used up.",
        )
      : e.message === "duplicate"
        ? text(
            language,
            "这封请求已处理，请勿重复提交。",
            "This request has already been processed.",
          )
        : e.message === "unconfigured"
          ? text(
              language,
              "此部署尚未启用 AI 服务。",
              "AI is not enabled on this deployment.",
            )
          : e.message === "timeout" || e.message?.includes("timeout")
            ? text(language, "回信超时。", "The request timed out.")
            : text(
                language,
                "AI 服务暂不可用。",
                "AI is temporarily unavailable.",
              );
  return (
    reason +
    (typeof e.remaining === "number"
      ? text(
          language,
          ` 本日剩余 ${e.remaining} 次。`,
          ` ${e.remaining} requests remain today.`,
        )
      : "") +
    (e.resetAt
      ? text(
          language,
          ` 额度于 ${new Date(e.resetAt).toLocaleString("zh-CN")} 重置。`,
          ` Resets at ${new Date(e.resetAt).toLocaleString("en-US")}.`,
        )
      : "")
  );
}
export async function requestService(
  path: string,
  body: Record<string, unknown>,
): Promise<ApiResult> {
  if (!BACKEND_ENABLED) throw new Error("disabled");
  const response = await fetch(`/api/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(22000),
  });
  const data = await response.json();
  if (!response.ok)
    throw Object.assign(new Error(data.error || "unavailable"), {
      remaining: data.remaining,
      resetAt: data.resetAt,
    });
  return data;
}
