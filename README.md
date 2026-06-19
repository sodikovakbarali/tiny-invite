# Tiny Invite

A playful, romantic, premium-looking date invitation website built with Next.js. One person opens the link, walks through a multi-step invitation flow, and their response is saved to Supabase. A private admin page lets you view submitted results.

## Tech stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **canvas-confetti** for celebration effects
- **Supabase** for Postgres storage (server-side only)
- **lucide-react** for icons

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier)
- A [Vercel](https://vercel.com) account (free tier) for deployment

## Supabase setup

1. Create a new Supabase project.
2. Open the **SQL Editor** and run:

```sql
create table responses (
  id uuid primary key default gen_random_uuid(),
  name text,
  answer text not null,
  selected_date text,
  selected_activity text,
  message text,
  user_agent text,
  ip_address text,
  country text,
  city text,
  region text,
  language text,
  referrer text,
  created_at timestamp with time zone default now()
);

create table page_views (
  id uuid primary key default gen_random_uuid(),
  name text,
  path text,
  ip_address text,
  country text,
  city text,
  region text,
  language text,
  referrer text,
  user_agent text,
  created_at timestamp with time zone default now()
);
```

**Already created the `responses` table?** Run this migration in the SQL Editor instead:

```sql
alter table responses add column if not exists ip_address text;
alter table responses add column if not exists country text;
alter table responses add column if not exists city text;
alter table responses add column if not exists region text;
alter table responses add column if not exists language text;
alter table responses add column if not exists referrer text;

create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  name text,
  path text,
  ip_address text,
  country text,
  city text,
  region text,
  language text,
  referrer text,
  user_agent text,
  created_at timestamp with time zone default now()
);
```

3. Copy your **Project URL** and **service role key** from **Project Settings → API**.

> The service role key bypasses Row Level Security. It is used only in server-side API routes and must never be exposed to the browser.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SITE_NAME=Tiny Invite
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=your-private-password
```

**Do not commit `.env.local`.**

### Vercel environment variables

When deploying, add the same four variables in your Vercel project settings:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_NAME` | Site title (e.g. `Tiny Invite`) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `ADMIN_PASSWORD` | Password for `/admin` page |

## Local development

```bash
npm install
npm run dev
```

Open:

- [http://localhost:3000](http://localhost:3000) — invitation flow
- [http://localhost:3000/admin](http://localhost:3000/admin) — admin dashboard
- [http://localhost:3000?name=Someone](http://localhost:3000?name=Someone) — optional name in the URL

**Without Supabase locally:** if `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are empty, responses are saved to `data/responses.json` during development so you can test the full flow. View them at `/admin` with your `ADMIN_PASSWORD`. For production on Vercel, Supabase env vars are required.

## Personalization

Because the repo is public, no names are hardcoded. Pass a name via query parameter:

```
https://your-site.vercel.app?name=Madina
```

The landing page will show: *"I made this for Madina."*

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Multi-step invite flow
│   ├── admin/page.tsx        # Password-protected admin
│   └── api/
│       ├── submit/route.ts   # Save responses (+ visitor metadata)
│       ├── track/route.ts    # Log page views
│       └── results/route.ts  # Fetch responses (password protected)
├── components/
│   ├── invite/               # Step components
│   ├── admin/                # Admin UI
│   └── ui/                   # Shared UI primitives
├── hooks/useInviteFlow.ts    # Flow state management
├── lib/
│   ├── supabaseAdmin.ts      # Server-side Supabase client
│   ├── activities.ts
│   └── dateOptions.ts
└── types/response.ts
```

## Deployment on Vercel

1. **Run the Supabase migration** (see SQL above) if you already have a live project — new columns and the `page_views` table are required.

2. Push the repo to GitHub:

```bash
git add .
git commit -m "Add visitor metadata and page view tracking"
git push
```

3. Vercel auto-deploys when you push to `main`. No new environment variables are needed — the same four vars still apply.

4. Wait for the deploy to finish in the Vercel dashboard (usually 1–2 minutes).

5. Test on your live URL:
   - Open `/` — this logs a page view
   - Submit a test response
   - Open `/admin`, enter your password — you should see **Page views** (with IP, location, language, referrer) and **Responses** (same metadata on each answer)

6. Delete any test rows from Supabase if needed.

7. Share the link (optionally with `?name=...`).

> **Note:** IP, country, and city come from Vercel headers and only appear on the deployed site — not when running `npm run dev` locally.

## Security notes

- `SUPABASE_SERVICE_ROLE_KEY` is only used in `src/lib/supabaseAdmin.ts` and API routes.
- Admin data is fetched only after password verification in `POST /api/results`.
- No GET endpoints expose response data.
- Never commit secrets, passwords, or Supabase keys to the repository.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
