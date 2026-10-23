import { readFile } from "node:fs/promises";
import path from "node:path";
const root = process.env.LOTM_DATA_DIR || ".local-data";
async function records(name) {
  try {
    return (await readFile(path.join(root, name), "utf8"))
      .trim()
      .split("\n")
      .filter(Boolean)
      .flatMap((line) => {
        try {
          return [JSON.parse(line)];
        } catch {
          return [];
        }
      });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}
const events = await records("lotm_events.jsonl");
const feedback = await records("lotm_feedback.jsonl");
const counts = {};
for (const entry of events) counts[entry.name] = (counts[entry.name] || 0) + 1;
console.log(
  JSON.stringify(
    {
      scope: "Local development data; not a production-user baseline",
      events: counts,
      feedbackCount: feedback.length,
      recentFeedback: feedback
        .slice(-10)
        .map(({ id, category, content_id, created_at }) => ({
          id,
          category,
          contentId: content_id,
          at: created_at,
        })),
    },
    null,
    2,
  ),
);
