import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

test("PostgreSQL migration enforces owner isolation, revision conflicts and atomic service quotas", async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
      grant usage on schema auth to authenticated;
      insert into auth.users values('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');`);
    await db.exec(
      await readFile(
        new URL("../supabase/migrations/20261022_lotm.sql", import.meta.url),
        "utf8",
      ),
    );
    await db.exec(
      `set role authenticated; set request.jwt.claim.sub='11111111-1111-4111-8111-111111111111';`,
    );
    const saved = await db.query<{ result: { ok: boolean; revision: number } }>(
      `select public.save_lotm_archive('{"schema":2,"nickname":"reader A"}'::jsonb,0) as result`,
    );
    assert.deepEqual(saved.rows[0].result, { ok: true, revision: 1 });
    const conflict = await db.query<{
      result: { ok: boolean; revision: number };
    }>(`select public.save_lotm_archive('{"schema":2}'::jsonb,0) as result`);
    assert.deepEqual(conflict.rows[0].result, { ok: false, revision: 1 });
    const updated = await db.query<{
      result: { ok: boolean; revision: number };
    }>(
      `select public.save_lotm_archive('{"schema":2,"nickname":"updated A"}'::jsonb,1) as result`,
    );
    assert.deepEqual(updated.rows[0].result, { ok: true, revision: 2 });
    const archive = await db.query<{ document: { nickname: string } }>(
      `select document from public.lotm_archives`,
    );
    assert.equal(archive.rows[0].document.nickname, "updated A");
    await assert.rejects(
      db.query(`select public.save_lotm_archive('{}'::jsonb,2)`),
      /Invalid archive/,
    );
    assert.equal(
      (await db.query(`select * from public.lotm_archives`)).rows.length,
      1,
    );
    await db.exec(
      `set request.jwt.claim.sub='22222222-2222-4222-8222-222222222222'`,
    );
    assert.equal(
      (await db.query(`select * from public.lotm_archives`)).rows.length,
      0,
    );
    await assert.rejects(
      db.query(
        `insert into public.lotm_archives(user_id,document) values('22222222-2222-4222-8222-222222222222','{}')`,
      ),
      /permission denied/,
    );
    await assert.rejects(
      db.query(
        `select public.consume_lotm_quota(repeat('a',64),'ai','request-000000000001',20)`,
      ),
      /permission denied/,
    );
    await assert.rejects(
      db.query(`select * from public.lotm_feedback`),
      /permission denied/,
    );
    await db.exec(`reset role; set role anon`);
    await assert.rejects(
      db.query(`select public.save_lotm_archive('{"schema":2}',0)`),
      /permission denied/,
    );
    await db.exec(`reset role; set role service_role`);
    const use = async (id: string) => {
      const r = await db.query<{
        result: { ok: boolean; duplicate: boolean; remaining: number };
      }>(`select public.consume_lotm_quota($1,'ai',$2,20) as result`, [
        "a".repeat(64),
        id,
      ]);
      return r.rows[0].result;
    };
    assert.deepEqual(await use("request-000000000001"), {
      ok: true,
      duplicate: false,
      remaining: 19,
    });
    assert.deepEqual(await use("request-000000000001"), {
      ok: false,
      duplicate: true,
      remaining: 19,
    });
    const burst = await Promise.all(
      Array.from({ length: 30 }, (_, i) => use(`request-00000000-${i}`)),
    );
    assert.equal(burst.filter((r) => r.ok).length, 19);
    assert.equal((await use("request-final-0000000")).remaining, 0);
    await assert.rejects(
      db.query(
        `select public.consume_lotm_quota('raw-ip','ai','request-000000000001',20)`,
      ),
      /Invalid quota request/,
    );
  } finally {
    await db.close();
  }
});
