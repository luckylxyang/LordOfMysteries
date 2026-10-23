import test from "node:test";
import assert from "node:assert/strict";
import { pathways, groups, sources, actingMethod } from "../src/data/canon";
import { chapterIndex, searchChapters } from "../src/data/chapterIndex";
import {
  resolvePathway,
  pathwayLabel,
  normalizeReading,
  initialReading,
} from "../src/domain/exploration";
test("22 complete Sequence ladders have bilingual names and resolvable evidence", () => {
  assert.equal(pathways.length, 22);
  assert.equal(new Set(pathways.map((p) => p.id)).size, 22);
  for (const p of pathways) {
    assert.ok(groups.some((g) => g.id === p.group));
    assert.deepEqual(
      p.sequences.map((s) => s.level).sort((a, b) => b - a),
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    );
    for (const s of p.sequences) {
      assert.ok(s.name.zh && s.name.en && s.ability.zh && s.ability.en);
      assert.ok(s.sourceIds.length);
      assert.ok(s.sourceIds.every((id) => sources.some((x) => x.id === id)));
    }
  }
});
test("Chapter evidence applies to a specific field and cannot certify a whole Sequence", () => {
  for (const p of pathways)
    for (const sequence of p.sequences) {
      assert.equal(new Set(sequence.sourceIds).size, sequence.sourceIds.length);
      for (const field of Object.values(sequence.evidence)) {
        if (field.status === "pending") assert.equal(field.sourceIds.length, 0);
        else assert.ok(field.sourceIds.length > 0);
        for (const id of field.sourceIds) {
          const source = sources.find((s) => s.id === id);
          assert.ok(source, `${p.id}/${sequence.level}: missing ${id}`);
          if (field.status === "chapter") {
            assert.ok(
              source.chapter &&
                source.edition?.zh &&
                source.edition?.en &&
                source.checkedAt,
            );
            assert.ok(
              source.url.startsWith(
                "https://www.webnovel.com/book/lord-of-mysteries_11022733006234505/",
              ),
            );
          }
        }
      }
    }
  const seer = pathways
    .find((p) => p.id === "fool")!
    .sequences.find((s) => s.level === 9)!;
  assert.equal(seer.evidence.ability.status, "chapter");
  assert.deepEqual(seer.evidence.name.sourceIds, ["novel-28"]);
  assert.equal(seer.evidence.acting.status, "chapter");
  assert.equal(seer.evidence.advancement.status, "pending");
  const midnightPoet = pathways
    .find((p) => p.id === "darkness")!
    .sequences.find((s) => s.level === 8)!;
  assert.equal(midnightPoet.evidence.name.status, "chapter");
  assert.equal(midnightPoet.evidence.ability.status, "reference");
  const gravedigger = pathways
    .find((p) => p.id === "death")!
    .sequences.find((s) => s.level === 8)!;
  assert.equal(gravedigger.evidence.ability.status, "reference");
  assert.deepEqual(gravedigger.evidence.ability.sourceIds, ["qidian-settings"]);
  assert.ok(gravedigger.evidence.ability.locator?.zh.includes("掘墓人"));
  assert.equal(gravedigger.evidence.advancement.status, "pending");
  assert.deepEqual(actingMethod.sourceIds, ["novel-21"]);
});
test("Legacy links keep reliable mappings and all pathway names are visible", () => {
  assert.equal(resolvePathway("seer")?.id, "fool");
  assert.equal(resolvePathway("nightmare")?.id, "darkness");
  assert.equal(resolvePathway("prayer")?.id, "sun");
  assert.equal(resolvePathway("philosopher"), undefined);
  for (const p of pathways) {
    assert.equal(pathwayLabel(p, "zh"), p.name.zh);
    assert.equal(pathwayLabel(p, "en"), p.name.en);
  }
  assert.deepEqual(normalizeReading(undefined), initialReading);
  assert.deepEqual(
    normalizeReading({
      chapter: 1,
      floor: 9,
      chosen: false,
      reducedMotion: true,
    }),
    { reducedMotion: true },
  );
  assert.deepEqual(normalizeReading({ reducedMotion: "true" }), initialReading);
});
test("Search excludes contradictory legacy chapter records and cites matched entries", () => {
  assert.equal(
    new Set(chapterIndex.map((c) => c.number)).size,
    chapterIndex.length,
  );
  assert.equal(searchChapters("第一次聚会")[0].chapter.number, 5);
  assert.equal(searchChapters("chapter 6")[0].chapter.number, 6);
  assert.equal(searchChapters("445")[0].chapter.title.en, "Live Broadcast");
  assert.equal(searchChapters("445")[0].chapter.review, "metadata");
  assert.equal(searchChapters("unknown/unindexed").length, 0);
  assert.equal(searchChapters("chapter 21")[0].chapter.review, "summary");
  assert.ok(searchChapters("扮演").some((r) => r.chapter.number === 21));
  assert.ok(searchChapters("占卜俱乐部").some((r) => r.chapter.number === 37));
  assert.ok(
    searchChapters("Spectator").every((r) =>
      r.chapter.url.startsWith("https://www.webnovel.com/"),
    ),
  );
});
