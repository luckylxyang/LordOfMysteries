import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { serviceMiddleware } from "../server/service";
import authCallback from "../api/auth/callback";
import { requestService } from "../src/utils/service";
import { track, recordVisit } from "../src/utils/telemetry";
import { BACKEND_ENABLED } from "../src/config/features";

test("Browser-only release blocks service and telemetry requests before network access", async () => {
  assert.equal(BACKEND_ENABLED, false);
  const originalFetch = globalThis.fetch;
  let requests = 0;
  globalThis.fetch = async () => {
    requests++;
    throw new Error("Unexpected network request");
  };
  try {
    track("assessment_complete");
    recordVisit();
    await assert.rejects(
      requestService("chat", { message: "hello" }),
      /disabled/,
    );
    await assert.rejects(
      requestService("plot-search", { query: "fog" }),
      /disabled/,
    );
    assert.equal(requests, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Deployment endpoints remain disabled with configured credentials; OAuth codes are discarded", async () => {
  const keys = [
    "GLM_API_KEY",
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "LOTM_QUOTA_SECRET",
  ];
  const previous = keys.map((key) => process.env[key]);
  keys.forEach((key) => {
    process.env[key] = "configured-test-value";
  });
  const server = createServer((req, res) => {
    if (req.url?.startsWith("/api/auth/callback")) authCallback(req, res);
    else void serviceMiddleware(req, res);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  try {
    for (const endpoint of ["chat", "plot-search", "events", "feedback"]) {
      const response = await fetch(`${origin}/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "hello", name: "card_download" }),
      });
      assert.equal(response.status, 404, endpoint);
      assert.deepEqual(await response.json(), { error: "disabled" });
      assert.equal(response.headers.get("cache-control"), "no-store");
    }
    const callback = await fetch(`${origin}/api/auth/callback?code=old-code`, {
      redirect: "manual",
    });
    assert.equal(callback.status, 302);
    assert.equal(callback.headers.get("location"), "/profile");
  } finally {
    keys.forEach((key, i) => {
      if (previous[i] === undefined) delete process.env[key];
      else process.env[key] = previous[i];
    });
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
