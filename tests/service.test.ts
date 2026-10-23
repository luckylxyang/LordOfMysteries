import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { handleService, parseKeywords } from "../server/service";

test("AI validation, malformed upstream, duplicate requests, concurrent durable quota and safe telemetry", async () => {
  process.env.NODE_ENV = "test";
  delete process.env.VERCEL;
  process.env.LOTM_DATA_DIR = await mkdtemp(
    path.join(os.tmpdir(), "lotm-service-test-"),
  );
  delete process.env.GLM_API_KEY;
  const input = () => ({
    message: "A new invention",
    language: "en",
    requestId: randomUUID(),
  });
  assert.equal(
    (
      await handleService(
        "chat",
        { ...input(), message: "x".repeat(501) },
        "test",
      )
    ).status,
    400,
  );
  assert.equal((await handleService("chat", input(), "test")).status, 503);
  process.env.GLM_API_KEY = "test-key-never-real";
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(
      JSON.stringify({
        choices: [{ message: { content: "An original note." } }],
      }),
      { status: 200 },
    );
  };
  try {
    const repeated = input();
    assert.equal((await handleService("chat", repeated, "one")).status, 200);
    assert.equal((await handleService("chat", repeated, "one")).status, 409);
    assert.equal(calls, 1);
    const responses = await Promise.all(
      Array.from({ length: 30 }, () => handleService("chat", input(), "burst")),
    );
    assert.equal(responses.filter((r) => r.status === 200).length, 20);
    assert.equal(responses.filter((r) => r.status === 429).length, 10);
    assert.equal(
      (await handleService("chat", input(), "burst")).body.remaining,
      0,
    );
    const persisted = JSON.parse(
      await readFile(
        path.join(process.env.LOTM_DATA_DIR, "quotas.json"),
        "utf8",
      ),
    );
    assert.ok(Object.values(persisted).some((row: any) => row.count === 20));
    assert.equal(
      (
        await handleService(
          "events",
          { name: "bad", contentId: "", value: 0 },
          "events",
        )
      ).status,
      400,
    );
    assert.equal(
      (
        await handleService(
          "events",
          { name: "share_attempt", contentId: "fool", value: 0 },
          "events",
        )
      ).status,
      200,
    );
    const feedback = await handleService(
      "feedback",
      {
        message: "Review chapter 1",
        category: "correction",
        contentId: "ch:1",
        requestId: randomUUID(),
      },
      "feedback",
    );
    assert.equal(feedback.status, 200);
    assert.ok(
      (
        await readFile(
          path.join(process.env.LOTM_DATA_DIR, "lotm_feedback.jsonl"),
          "utf8",
        )
      ).includes("ch:1"),
    );
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          choices: [{ message: { content: '{"keywords":[99]}' } }],
        }),
      );
    assert.equal(
      (
        await handleService(
          "plot-search",
          { query: "test", language: "en", requestId: randomUUID() },
          "invalid",
        )
      ).status,
      502,
    );
    globalThis.fetch = async () => {
      throw new DOMException("timeout", "TimeoutError");
    };
    const timedOut = await handleService("chat", input(), "timeout");
    assert.equal(timedOut.body.error, "timeout");
    assert.equal(timedOut.body.remaining, 19);
    assert.equal(typeof timedOut.body.resetAt, "string");
  } finally {
    globalThis.fetch = originalFetch;
    delete process.env.GLM_API_KEY;
  }
});
test("AI search terms must be bounded structured data", () => {
  assert.deepEqual(parseKeywords('{"keywords":["Klein"]}'), ["Klein"]);
  for (const value of [
    "{}",
    "null",
    '{"keywords":[1]}',
    '{"keywords":["' + "x".repeat(61) + '"]}',
  ])
    assert.throws(() => parseKeywords(value));
});
