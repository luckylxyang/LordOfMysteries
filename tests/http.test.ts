import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { serviceHttpAdapter } from "../server/service";

test("The HTTP adapter rejects cross-origin, malformed and oversized requests before invoking services", async () => {
  const server = createServer((req, res) => void serviceHttpAdapter(req, res));
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}/api/chat`;
  try {
    let response = await fetch(url);
    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "POST");
    assert.equal(response.headers.get("cache-control"), "no-store");
    response = await fetch(url, { method: "POST", body: "{}" });
    assert.equal(response.status, 415);
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "https://different.example",
      },
      body: "{}",
    });
    assert.equal(response.status, 403);
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{",
    });
    assert.equal(response.status, 400);
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "x".repeat(13000) }),
    });
    assert.equal(response.status, 413);
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "[]",
    });
    assert.equal(response.status, 400);
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: new URL(url).origin,
      },
      body: '{"message":"test","language":"en","requestId":"test-request-0000000001"}',
    });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error, "unconfigured");
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
