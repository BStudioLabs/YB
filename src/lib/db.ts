import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { projects as localProjects, type Project } from "@/data/projects";
import { services as localServices, type Service } from "@/data/services";

/**
 * Content access layer.
 * Reads published content from Supabase (anon key, RLS-guarded) when
 * configured; falls back to the local files in src/data/ otherwise —
 * so a fresh clone runs with zero setup.
 */

let client: SupabaseClient | null | undefined;

function getPublicClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client =
    url && key
      ? createClient(url, key, { auth: { persistSession: false } })
      : null;
  return client;
}

export async function getProjects(): Promise<Project[]> {
  const sb = getPublicClient();
  if (!sb) return localProjects;
  const { data, error } = await sb
    .from("projects")
    .select(
      "slug, title, year, category, tags, summary, problem, solution, stack, results, image_url"
    )
    .order("sort_order");
  if (error || !data || data.length === 0) {
    if (error) console.error("[db] projects query failed:", error.message);
    return localProjects;
  }
  return data as Project[];
}

export async function getServices(): Promise<Service[]> {
  const sb = getPublicClient();
  if (!sb) return localServices;
  const { data, error } = await sb
    .from("services")
    .select("slug, title, description, icon")
    .order("sort_order");
  if (error || !data || data.length === 0) {
    if (error) console.error("[db] services query failed:", error.message);
    return localServices;
  }
  return data.map((s) => ({
    id: s.slug,
    title: s.title,
    description: s.description,
    icon: s.icon,
  }));
}
