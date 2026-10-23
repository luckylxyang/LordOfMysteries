import test from "node:test";
import assert from "node:assert/strict";
import {
  evaluate,
  questions,
  validateSnapshot,
} from "../src/domain/exploration";
import { pathways } from "../src/data/canon";

test("All 6,561 answer combinations produce deterministic bounded scores and all 22 primary results", () => {
  const coverage = new Map(pathways.map((p) => [p.id, 0]));
  for (let n = 0; n < 3 ** questions.length; n++) {
    let digits = n;
    const answers = questions.map(() => {
      const a = digits % 3;
      digits = Math.floor(digits / 3);
      return a;
    });
    const result = evaluate(answers, "coverage", "2026-10-22T00:00:00.000Z");
    assert.equal(result.scores.length, 22);
    assert.equal(new Set(result.scores.map((s) => s.id)).size, 22);
    assert.ok(
      result.scores.every(
        (s) => Number.isFinite(s.score) && s.score >= 0 && s.score <= 100,
      ),
    );
    assert.deepEqual(
      result,
      evaluate(answers, "coverage", "2026-10-22T00:00:00.000Z"),
    );
    coverage.set(result.scores[0].id, coverage.get(result.scores[0].id)! + 1);
  }
  assert.ok(
    [...coverage.values()].every((count) => count > 0),
    JSON.stringify(Object.fromEntries(coverage)),
  );
  console.log("Primary pathway coverage:", Object.fromEntries(coverage));
});
test("Saved snapshots reject corrupt answers, manipulated scores and invalid records", () => {
  const result = evaluate(
    Array(8).fill(0),
    "snapshot",
    "2026-10-22T00:00:00.000Z",
  );
  assert.deepEqual(validateSnapshot(result), result);
  assert.equal(validateSnapshot({ ...result, answers: [99] }), null);
  assert.equal(
    validateSnapshot({ ...result, scores: [{ id: "fake", score: 100 }] }),
    null,
  );
  assert.equal(
    validateSnapshot({ ...result, commentary: { zh: "", en: "" } }),
    null,
  );
  const changed = structuredClone(result);
  changed.scores[0].score -= 0.1;
  assert.equal(validateSnapshot(changed), null);
  assert.throws(() => evaluate(Array(8).fill(-1)));
});
