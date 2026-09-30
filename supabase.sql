-- Hashem Life & Career OS
-- Run this entire file in Supabase SQL Editor.
-- The site has NO visible login. It uses Supabase Anonymous Sign-In in the background.
-- Data is still protected by RLS and is isolated by the anonymous user's UUID.

create table if not exists public.user_dashboard_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_dashboard_data enable row level security;

drop policy if exists "Users can select own dashboard" on public.user_dashboard_data;
drop policy if exists "Users can insert own dashboard" on public.user_dashboard_data;
drop policy if exists "Users can update own dashboard" on public.user_dashboard_data;
drop policy if exists "Users can delete own dashboard" on public.user_dashboard_data;

create policy "Anonymous users can select own dashboard"
on public.user_dashboard_data
for select
to authenticated
using (
  auth.uid() = user_id
  and coalesce((auth.jwt()->>'is_anonymous')::boolean,false) = true
);

create policy "Anonymous users can insert own dashboard"
on public.user_dashboard_data
for insert
to authenticated
with check (
  auth.uid() = user_id
  and coalesce((auth.jwt()->>'is_anonymous')::boolean,false) = true
);

create policy "Anonymous users can update own dashboard"
on public.user_dashboard_data
for update
to authenticated
using (
  auth.uid() = user_id
  and coalesce((auth.jwt()->>'is_anonymous')::boolean,false) = true
)
with check (
  auth.uid() = user_id
  and coalesce((auth.jwt()->>'is_anonymous')::boolean,false) = true
);

create policy "Anonymous users can delete own dashboard"
on public.user_dashboard_data
for delete
to authenticated
using (
  auth.uid() = user_id
  and coalesce((auth.jwt()->>'is_anonymous')::boolean,false) = true
);

grant select, insert, update, delete on public.user_dashboard_data to authenticated;
