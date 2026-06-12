# Y/B — We build the web. We secure it.

Personal brand / studio site for **Youssef Baaziz**. Black, white, one neon-lime dot.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Supabase

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

The site works out of the box — without Supabase configured, contact-form
submissions are accepted but not stored (a warning is logged server-side).

## Database (Supabase)

The site has a full content database. Until it's configured, pages render from
the local files in `src/data/` — the DB is a drop-in upgrade, not a requirement.

**Tables:** `projects` (case studies), `services` (capability cards),
`contact_messages` (form inbox). Published content is publicly readable via the
anon key under RLS; contact messages are service-role only.

Setup:

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`, then `supabase/seed.sql`
   (seeds the current site content; both are safe to re-run).
3. Copy `.env.example` to `.env.local` and fill in from Project Settings → API:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (**server-only secret** — powers `/api/contact`)
4. Restart the dev server.

From then on: edit projects/services in the Supabase table editor and the site
picks it up (pages revalidate hourly in production; instantly in dev). Set
`published = false` to hide a row, `sort_order` to reorder. Contact-form
submissions land in `contact_messages`.

## Deploy (Vercel)

```bash
npx vercel
```

or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
Add the two env vars in Vercel → Project → Settings → Environment Variables.

Before launch: set your real domain in `src/data/site.ts` (`site.url`) — it drives
the Open Graph / metadata URLs.

## Edit content without touching components

| File                   | Controls                                              |
| ---------------------- | ----------------------------------------------------- |
| `src/data/site.ts`     | Name, email, socials, nav, stats, skills, marquee     |
| `src/data/services.ts` | The four service cards                                |
| `src/data/projects.ts` | Project grid + full case-study pages (`/work/[slug]`) |

Add a project = add one object to `projects.ts`. The grid card, the case-study
page, and next/prev navigation all derive from it.

## Map

```
src/
  app/
    page.tsx              # home: hero → marquee → services → work → about → contact
    work/[slug]/page.tsx  # case-study template (static-generated per project)
    api/contact/route.ts  # validates + stores submissions in Supabase
    not-found.tsx         # on-brand 404
    layout.tsx            # fonts, metadata/OG, global chrome
    icon.svg              # B-dot favicon
  components/             # Hero, HeroCanvas, Work, Contact, Terminal, …
  data/                   # all editable content lives here
  lib/supabase.ts         # server-only Supabase client (null-safe when unconfigured)
supabase/schema.sql       # run once in your Supabase project
```

## Admin dashboard

`/admin` — password-protected content manager (password = `ADMIN_PASSWORD` in
`.env.local`; sessions are signed HttpOnly cookies, valid one week).

- **Projects** — create, edit, delete, publish/unpublish, reorder. The
  problem/solution fields accept **markdown** (bold, lists, links, code…),
  rendered on the case-study pages.
- **Services** — edit the four capability cards.
- **Inbox** — read contact-form messages, mark handled, delete.

All writes go through server actions using the service-role key; nothing
admin-related is exposed to the browser. The admin routes are `noindex`.

## Easter eggs

- Press `/` anywhere → the audit terminal.
- Open the browser console → say hi.

Built & secured by Y/B.
