# Hashem Life & Career OS

Personal 8-week Software Engineering + English + Projects + Career dashboard.

## What is included
- Dashboard with live progress
- Daily 8-hour tracker
- 8-week Software Engineering plan
- English for Software Engineers
- Foundation + Professional Practice
- 7 existing projects with stacks and progress
- Specialization Discovery
- Career / CV / GitHub / Portfolio / LinkedIn checklist
- Health tracking separated from the 8 development hours
- Weekly reports and review
- Local browser persistence
- JSON Export / Import
- Supabase PostgreSQL Cloud Sync
- No visible Login / Signup screen
- Supabase Anonymous Cloud Session
- Local + Cloud data with RLS isolation

## Daily allocation
- Software Engineering: 3h
- English: 2h
- Projects: 1.5h
- Specialization Discovery: 1h
- Career: 0.5h
- Health is outside the 8 hours.

## Supabase setup

The dashboard uses Supabase Anonymous Sign-In in the background. There is no phone/password login screen in this version.

1. In Supabase Dashboard open Authentication > Sign In / Providers and enable **Anonymous Sign-Ins**.
2. Open SQL Editor and run the complete `supabase.sql` file.
3. Open the dashboard > Settings & Backup.
4. Enter the **Publishable Key** (`sb_publishable_...`) and click **ربط قاعدة البيانات**.
5. The app creates or restores its Anonymous Cloud Session, then loads the Cloud row for that session.
6. Local changes are saved to LocalStorage and automatically synced to Supabase when Cloud is connected.
7. **حذف البيانات المحلية فقط** removes browser-local data; it does not delete the Cloud row.
8. **فصل Cloud Session** signs the anonymous user out. Because anonymous users have no permanent identity, that same session cannot be recovered after sign-out or clearing browser data. Keep JSON backups.

Never use a Secret / Service Role key in the browser.

Supabase Anonymous users use the `authenticated` Postgres role, while RLS restricts every row to `auth.uid() = user_id`.

## Data seed

The initial dashboard includes Hashem's known non-sensitive career/project information:
- Bachelor of Software Engineering — JUST — 2026
- Goal: Software Engineer
- 8-week / 8-hour daily development structure
- Job Application Tracker
- Customer Management
- TREAQ
- Campus Event System
- Portfolio
- PLUGIX
- Qareen

## Hosting

Static site. Netlify can deploy it directly from the main branch.