import type { IncomingMessage, ServerResponse } from "node:http";
import { BACKEND_ENABLED } from "../../src/config/features";
// Compatibility redirect. The browser owns its PKCE verifier and session.
export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (!BACKEND_ENABLED) {
    res.statusCode = 302;
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Location", "/profile");
    res.end();
    return;
  }
  const query = new URL(req.url || "", "http://localhost").searchParams;
  const code = query.get("code");
  res.statusCode = 302;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader(
    "Location",
    code ? `/auth/callback?code=${encodeURIComponent(code)}` : "/auth/callback",
  );
  res.end();
}
