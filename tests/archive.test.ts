import test from "node:test";
import assert from "node:assert/strict";
import { ArchiveSync, type SyncState } from "../src/state/archiveSync";
const deferred = <T>() => {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
};

test("Edits during a cloud save are queued using the returned revision", async () => {
  const save1 = deferred<{ ok: boolean; revision: number }>();
  const writes: Array<{ owner: string; document: string; revision: number }> =
    [];
  const flags: boolean[] = [];
  const statuses: SyncState[] = [];
  const engine = new ArchiveSync("guest", {
    read: async () => ({ document: "remote", revision: 3 }),
    save: async (owner, document, revision) => {
      writes.push({ owner, document, revision });
      return writes.length === 1 ? save1.promise : { ok: true, revision: 5 };
    },
    changed: () => {},
    pending: (_o, p) => flags.push(p),
    status: (s) => statuses.push(s),
  });
  await engine.select("A", "local", false);
  engine.write("edit one");
  const flush = engine.flush();
  engine.write("edit two");
  await Promise.resolve();
  save1.resolve({ ok: true, revision: 4 });
  await flush;
  assert.deepEqual(writes, [
    { owner: "A", document: "edit one", revision: 3 },
    { owner: "A", document: "edit two", revision: 4 },
  ]);
  assert.equal(flags.at(-1), false);
  assert.equal(statuses.at(-1), "synced");
});
test("Stale account reads and writes cannot change the active archive", async () => {
  const readA = deferred<{ document: string; revision: number }>();
  const saveA = deferred<{ ok: boolean; revision: number }>();
  const changes: string[] = [];
  const engine = new ArchiveSync("guest", {
    read: async (owner) =>
      owner === "A" ? readA.promise : { document: "B remote", revision: 1 },
    save: async () => saveA.promise,
    changed: (owner, value) => changes.push(`${owner}:${value}`),
    pending: () => {},
    status: () => {},
  });
  const loadingA = engine.select("A", "A local", false);
  await engine.select("B", "B local", false);
  readA.resolve({ document: "A remote", revision: 4 });
  await loadingA;
  assert.equal(engine.document, "B remote");
  assert.ok(!changes.includes("A:A remote"));
  engine.write("B edit");
  const saving = engine.flush();
  await engine.select("guest", "guest local", false);
  saveA.resolve({ ok: true, revision: 2 });
  await saving;
  assert.equal(engine.document, "guest local");
  assert.equal(engine.owner, "guest");
});
test("Offline edits and remote conflicts stay local until explicit reconciliation", async () => {
  let rev = 1;
  let saveCount = 0;
  const states: SyncState[] = [];
  const engine = new ArchiveSync("local", {
    read: async () => ({ document: "cloud", revision: rev }),
    save: async () => {
      saveCount++;
      return { ok: saveCount > 1, revision: ++rev };
    },
    changed: () => {},
    pending: () => {},
    status: (s) => states.push(s),
  });
  await engine.select("A", "offline edits", true);
  assert.equal(engine.document, "offline edits");
  assert.equal(states.at(-1), "conflict");
  assert.equal(saveCount, 0);
  await engine.retryLocal();
  assert.equal(states.at(-1), "conflict");
  await engine.retryLocal();
  assert.equal(states.at(-1), "synced");
  assert.equal(engine.document, "offline edits");
});
