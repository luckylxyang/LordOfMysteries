// Legacy callers also use the same server-only proxy.
import { requestService } from "./service";
export async function sendChatMessage(message: string, language: "zh" | "en") {
  const data = await requestService("chat", {
    message,
    language,
    requestId: crypto.randomUUID(),
  });
  return { message: data.message || "" };
}
export async function analyzePlotQuery(query: string, language: "zh" | "en") {
  try {
    const data = await requestService("plot-search", {
      query,
      language,
      requestId: crypto.randomUUID(),
    });
    return {
      keywords: data.keywords || [],
      characters: [] as string[],
      locations: [] as string[],
      events: [] as string[],
      searchSuggestions: [] as string[],
      confidence: undefined as number | undefined,
      intent: undefined as string | undefined,
      timeline: undefined as string | undefined,
      matchedPhrases: [] as string[],
    };
  } catch {
    return {
      keywords: [query],
      characters: [] as string[],
      locations: [] as string[],
      events: [] as string[],
      searchSuggestions: [] as string[],
      confidence: undefined as number | undefined,
      intent: undefined as string | undefined,
      timeline: undefined as string | undefined,
      matchedPhrases: [] as string[],
    };
  }
}
