-- ============================================================
-- projects.image_url — cover image shown on the grid + case study
-- Paste any public URL (e.g. a Supabase Storage public link).
-- ============================================================

alter table public.projects
  add column if not exists image_url text;
