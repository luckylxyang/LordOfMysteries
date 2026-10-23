import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { pathways } from "../src/data/canon";
import { identityArt, identityArtUrl } from "../src/data/identityArt";

test("Every canonical pathway ships a distinct, valid local illustration", () => {
  assert.deepEqual(
    Object.keys(identityArt).sort(),
    pathways.map((p) => p.id).sort(),
  );
  const hashes = new Set<string>();
  for (const path of pathways) {
    const art = identityArt[path.id];
    assert.ok(art.motif.zh && art.motif.en, path.id);
    const file = readFileSync(
      new URL(`../public${identityArtUrl(path.id)}`, import.meta.url),
    );
    assert.equal(file.toString("ascii", 0, 4), "RIFF", path.id);
    assert.equal(file.toString("ascii", 8, 12), "WEBP", path.id);
    assert.ok(file.length > 25000, path.id);
    hashes.add(createHash("sha256").update(file).digest("hex"));
  }
  assert.equal(
    hashes.size,
    22,
    "Pathways must not share a recolored fallback asset",
  );
});

test("Artwork URLs support subpath deployments and reject unknown IDs", () => {
  assert.equal(
    identityArtUrl("fool", "/lotm/"),
    "/lotm/art/identity/fool.webp",
  );
  for (const id of ["../fool", "toString", "unknown"])
    assert.throws(() => identityArtUrl(id));
});
