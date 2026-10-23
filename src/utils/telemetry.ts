import { BACKEND_ENABLED } from "../config/features";

export type EventName =
  | "assessment_start"
  | "assessment_complete"
  | "card_download"
  | "share_attempt"
  | "share_landing"
  | "pathway_view"
  | "search_results"
  | "search_empty"
  | "return_visit";
export function track(name: EventName, contentId = "", value = 0) {
  if (!BACKEND_ENABLED) return;
  const event = {
    name,
    contentId: contentId.slice(0, 100),
    value,
    at: new Date().toISOString(),
  };
  try {
    const entries = JSON.parse(localStorage.getItem("lotm.events") || "[]");
    localStorage.setItem(
      "lotm.events",
      JSON.stringify([...entries, event].slice(-250)),
    );
  } catch {
    /* Metrics must not interrupt exploration. */
  }
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => {});
}

let visitRecorded = false;
export function recordVisit() {
  if (!BACKEND_ENABLED) return;
  if (visitRecorded) return;
  visitRecorded = true;
  try {
    const previous = Number(localStorage.getItem("lotm.lastVisit") || 0);
    const now = Date.now();
    if (previous && now - previous > 30 * 60 * 1000) track("return_visit");
    localStorage.setItem("lotm.lastVisit", String(now));
  } catch {
    /* A return visit cannot be inferred without local persistence. */
  }
}
