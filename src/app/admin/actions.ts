"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  checkPassword,
  requireAdmin,
  sessionToken,
} from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase";

function db() {
  const sb = getSupabaseAdmin();
  if (!sb) throw new Error("Supabase is not configured (.env.local)");
  return sb;
}

/** Bust every cached page so edits show up immediately. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

// ---------- auth ----------

export async function login(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const pass = String(formData.get("password") ?? "");
  if (!checkPassword(pass)) {
    // slow down brute force a little
    await new Promise((r) => setTimeout(r, 800));
    return { error: "Wrong password." };
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // one week
  });
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

// ---------- projects ----------

function splitList(v: string, sep: RegExp): string[] {
  return v
    .split(sep)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function saveProject(formData: FormData) {
  await requireAdmin();
  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const row = {
    slug: String(formData.get("slug") ?? "").trim().toLowerCase(),
    title: String(formData.get("title") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim(),
    category: String(formData.get("category") ?? "web"),
    tags: splitList(String(formData.get("tags") ?? ""), /,/),
    summary: String(formData.get("summary") ?? "").trim(),
    problem: String(formData.get("problem") ?? "").trim(),
    solution: String(formData.get("solution") ?? "").trim(),
    stack: splitList(String(formData.get("stack") ?? ""), /,/),
    results: splitList(String(formData.get("results") ?? ""), /\r?\n/),
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };
  if (!row.slug || !row.title) throw new Error("Slug and title are required");

  const sb = db();
  const { error } = originalSlug
    ? await sb.from("projects").update(row).eq("slug", originalSlug)
    : await sb.from("projects").insert(row);
  if (error) throw new Error(error.message);

  revalidateSite();
  redirect("/admin");
}

export async function deleteProject(slug: string) {
  await requireAdmin();
  const { error } = await db().from("projects").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidateSite();
}

// ---------- services ----------

export async function saveService(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "").trim();
  const row = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    icon: String(formData.get("icon") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };
  if (!slug || !row.title) throw new Error("Slug and title are required");
  const { error } = await db().from("services").update(row).eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidateSite();
  redirect("/admin/services");
}

// ---------- inbox ----------

export async function setMessageHandled(id: string, handled: boolean) {
  await requireAdmin();
  const { error } = await db()
    .from("contact_messages")
    .update({ handled })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/inbox");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  const { error } = await db().from("contact_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/inbox");
}
