-- Hashem Life & Career OS
-- Supabase setup for the dashboard's Anonymous Cloud Session.
-- Run this entire file in Supabase SQL Editor.

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
drop policy if exists "Anonymous users can select own dashboard" on public.user_dashboard_data;
drop policy if exists "Anonymous users can insert own dashboard" on public.user_dashboard_data;
drop policy if exists "Anonymous users can update own dashboard" on public.user_dashboard_data;
drop policy if exists "Anonymous users can delete own dashboard" on public.user_dashboard_data;

create policy "Authenticated users can select own dashboard"
on public.user_dashboard_data for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Authenticated users can insert own dashboard"
on public.user_dashboard_data for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Authenticated users can update own dashboard"
on public.user_dashboard_data for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Authenticated users can delete own dashboard"
on public.user_dashboard_data for delete to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.user_dashboard_data from anon;
grant select, insert, update, delete on table public.user_dashboard_data to authenticated;
