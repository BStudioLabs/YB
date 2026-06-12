import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase";
import ProjectForm, {
  type ProjectFormData,
} from "@/components/admin/ProjectForm";

export default async function EditProject({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAdmin();
  const { slug } = await params;
  const sb = getSupabaseAdmin();
  if (!sb) {
    return <p className="form-fail">Supabase is not configured — check .env.local.</p>;
  }
  const { data } = await sb
    .from("projects")
    .select(
      "slug, title, year, category, tags, summary, problem, solution, stack, results, sort_order, published"
    )
    .eq("slug", slug)
    .single();
  if (!data) notFound();

  return (
    <>
      <div className="admin-bar">
        <h1>
          Edit<span className="dot">.</span> <small>/{data.slug}</small>
        </h1>
      </div>
      <ProjectForm project={data as ProjectFormData} />
    </>
  );
}
