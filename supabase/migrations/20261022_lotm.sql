-- Apply once in Supabase SQL Editor. No browser service-role key is required.
begin;

create table if not exists public.lotm_archives (
  user_id uuid primary key references auth.users(id) on delete cascade,
  document jsonb not null check (jsonb_typeof(document) = 'object'),
  revision bigint not null default 1 check (revision > 0),
  updated_at timestamptz not null default now()
);
alter table public.lotm_archives enable row level security;
drop policy if exists "Read own LOTM archive" on public.lotm_archives;
create policy "Read own LOTM archive" on public.lotm_archives for select to authenticated using ((select auth.uid()) = user_id);
revoke all on public.lotm_archives from anon, authenticated;
grant select on public.lotm_archives to authenticated;
grant all on public.lotm_archives to service_role;

create or replace function public.save_lotm_archive(document jsonb, expected_revision bigint)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare account uuid := auth.uid(); current_revision bigint;
begin
  if account is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if jsonb_typeof(document) is distinct from 'object' or document->>'schema' is distinct from '2'
     or octet_length(document::text) > 300000 or expected_revision is null or expected_revision < 0 then
    raise exception 'Invalid archive' using errcode = '22023';
  end if;
  -- Serializes even the first insert, when there is no row to lock yet.
  perform pg_advisory_xact_lock(hashtextextended(account::text, 0));
  select a.revision into current_revision from public.lotm_archives a where a.user_id = account for update;
  if coalesce(current_revision,0) <> expected_revision then
    return jsonb_build_object('ok',false,'revision',coalesce(current_revision,0));
  end if;
  if current_revision is null then
    insert into public.lotm_archives(user_id,document,revision) values(account,document,1);
    current_revision := 1;
  else
    current_revision := current_revision + 1;
    update public.lotm_archives a set document = save_lotm_archive.document, revision = current_revision, updated_at = now() where a.user_id = account;
  end if;
  return jsonb_build_object('ok',true,'revision',current_revision);
end;
$$;
revoke all on function public.save_lotm_archive(jsonb,bigint) from public, anon;
grant execute on function public.save_lotm_archive(jsonb,bigint) to authenticated;

create table if not exists public.lotm_quotas (
  day date not null, bucket text not null, subject text not null,
  used integer not null default 0 check(used >= 0),
  requests text[] not null default '{}',
  primary key(day,bucket,subject)
);
alter table public.lotm_quotas enable row level security;
revoke all on public.lotm_quotas from anon, authenticated;
grant all on public.lotm_quotas to service_role;

create or replace function public.consume_lotm_quota(subject_key text,bucket_name text,request_key text,daily_limit integer)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare today date := timezone('UTC',now())::date; entry public.lotm_quotas%rowtype;
begin
  if subject_key !~ '^[a-f0-9]{64}$' or bucket_name not in ('ai','events','feedback')
     or request_key !~ '^[-a-zA-Z0-9_]{16,80}$' or daily_limit not between 1 and 500
     or subject_key is null or bucket_name is null or request_key is null or daily_limit is null then
    raise exception 'Invalid quota request' using errcode = '22023';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(today::text || ':' || bucket_name || ':' || subject_key,0));
  insert into public.lotm_quotas(day,bucket,subject) values(today,bucket_name,subject_key) on conflict do nothing;
  select * into entry from public.lotm_quotas q where q.day=today and q.bucket=bucket_name and q.subject=subject_key for update;
  if request_key = any(entry.requests) then
    return jsonb_build_object('ok',false,'duplicate',true,'remaining',greatest(0,daily_limit-entry.used));
  end if;
  if entry.used >= daily_limit then
    return jsonb_build_object('ok',false,'duplicate',false,'remaining',0);
  end if;
  update public.lotm_quotas q set used=used+1, requests=array_append(requests,request_key) where q.day=today and q.bucket=bucket_name and q.subject=subject_key;
  return jsonb_build_object('ok',true,'duplicate',false,'remaining',daily_limit-entry.used-1);
end;
$$;
revoke all on function public.consume_lotm_quota(text,text,text,integer) from public, anon, authenticated;
grant execute on function public.consume_lotm_quota(text,text,text,integer) to service_role;

create table if not exists public.lotm_events (
  id bigint generated always as identity primary key,
  name text not null check(name in ('assessment_start','assessment_complete','card_download','share_attempt','share_landing','pathway_view','search_results','search_empty','return_visit')),
  content_id text not null default '' check(length(content_id)<=100),
  value double precision not null default 0 check(value between -1000000000 and 1000000000),
  created_at timestamptz not null default now()
);
create table if not exists public.lotm_feedback (
  id uuid primary key,
  category text not null check(category in ('correction','search','experience')),
  content_id text not null default '' check(length(content_id)<=100),
  message text not null check(length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);
alter table public.lotm_events enable row level security;
alter table public.lotm_feedback enable row level security;
revoke all on public.lotm_events, public.lotm_feedback from anon, authenticated;
grant all on public.lotm_events, public.lotm_feedback to service_role;
grant usage, select on sequence public.lotm_events_id_seq to service_role;

commit;
