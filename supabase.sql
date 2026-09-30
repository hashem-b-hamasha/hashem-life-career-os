-- Hashem Life & Career OS
-- Run this in Supabase SQL Editor.
-- This design stores the whole personal dashboard as one JSON document per user.
-- RLS ensures a signed-in user can only access their own row.

create table if not exists public.user_dashboard_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_dashboard_data enable row level security;

drop policy if exists "Users can select own dashboard" on public.user_dashboard_data;
create policy "Users can select own dashboard"
on public.user_dashboard_data for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own dashboard" on public.user_dashboard_data;
create policy "Users can insert own dashboard"
on public.user_dashboard_data for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own dashboard" on public.user_dashboard_data;
create policy "Users can update own dashboard"
on public.user_dashboard_data for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own dashboard" on public.user_dashboard_data;
create policy "Users can delete own dashboard"
on public.user_dashboard_data for delete
to authenticated
using (auth.uid() = user_id);

grant select, insert, update, delete on public.user_dashboard_data to authenticated;
