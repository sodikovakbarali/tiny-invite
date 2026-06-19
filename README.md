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
- [http://localhost:3000?name=Someone](http://localhost:3000?name=Someone) — personalized landing (optional)

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
│       ├── submit/route.ts   # Save responses
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

1. Push the repo to GitHub:

```bash
git add .
git commit -m "Build romantic invite flow"
git push
```

2. Go to [vercel.com](https://vercel.com) and import the `tiny-invite` repository.
3. Add all four environment variables.
4. Deploy.
5. Test the full flow on your Vercel URL.
6. Open `/admin` and confirm responses appear.
7. Delete any test rows from Supabase if needed.
8. Share the link (optionally with `?name=...`).

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
