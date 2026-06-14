-- ============================================================
-- Y/B — database schema
-- Run once in the Supabase SQL editor (then run seed.sql).
-- ============================================================

-- ---------- helpers ----------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- enums ----------

do $$ begin
  create type public.project_category as enum ('web', 'security', 'systems');
exception when duplicate_object then null;
end $$;

-- ============================================================
-- projects — drives the grid, filters, and /work/[slug] pages
-- ============================================================

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title       text not null check (char_length(title) between 1 and 120),
  year        text not null check (year ~ '^[0-9]{4}$'),
  category    public.project_category not null,
  tags        text[] not null default '{}',
  summary     text not null,
  problem     text not null,
  solution    text not null,
  stack       text[] not null default '{}',
  results     text[] not null default '{}',
  image_url   text, -- cover image; any public URL (e.g. Supabase Storage)
  sort_order  integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists projects_published_order_idx
  on public.projects (published, sort_order);

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ============================================================
-- services — the four capability cards
-- ============================================================

create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title       text not null check (char_length(title) between 1 and 120),
  description text not null,
  icon        text not null, -- SVG path data, rendered at 24×24
  sort_order  integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists services_published_order_idx
  on public.services (published, sort_order);

drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- ============================================================
-- contact_messages — inbound from the website form
-- ============================================================

create table if not exists public.contact_messages (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null check (char_length(name) between 2 and 200),
  email        text not null check (email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  project_type text check (char_length(project_type) <= 100),
  message      text not null check (char_length(message) between 6 and 5000),
  handled      boolean not null default false
);

create index if not exists contact_messages_inbox_idx
  on public.contact_messages (handled, created_at desc);

-- ============================================================
-- row level security
-- ============================================================

alter table public.projects         enable row level security;
alter table public.services         enable row level security;
alter table public.contact_messages enable row level security;

-- Published content is publicly readable (anon key, used by the site).
drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects"
  on public.projects for select
  to anon, authenticated
  using (published);

drop policy if exists "public read published services" on public.services;
create policy "public read published services"
  on public.services for select
  to anon, authenticated
  using (published);

-- contact_messages: NO public policies on purpose.
-- Only the service-role key (server-side /api/contact route) can read/write.

comment on table public.projects is
  'Portfolio case studies. Site reads published rows via anon key; manage rows in the dashboard or via service role.';
comment on table public.services is
  'Capability cards on the site. Same access model as projects.';
comment on table public.contact_messages is
  'Inbound contact-form messages. Service-role only — never expose to the browser.';
