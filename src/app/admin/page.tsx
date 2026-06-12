import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { deleteProject } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";

interface Row {
  slug: string;
  title: string;
  year: string;
  category: string;
  sort_order: number;
  published: boolean;
}

export default async function AdminProjects() {
  await requireAdmin();
  const sb = getSupabaseAdmin();
  if (!sb) {
    return <p className="form-fail">Supabase is not configured — check .env.local.</p>;
  }
  const { data, error } = await sb
    .from("projects")
    .select("slug, title, year, category, sort_order, published")
    .order("sort_order");
  if (error) return <p className="form-fail">DB error: {error.message}</p>;
  const rows = (data ?? []) as Row[];

  return (
    <>
      <div className="admin-bar">
        <h1>
          Projects<span className="dot">.</span>{" "}
          <small>{rows.length} total</small>
        </h1>
        <Link className="btn solid" href="/admin/projects/new">
          + New project
        </Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Year</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.slug} className={p.published ? "" : "off"}>
              <td>{String(p.sort_order).padStart(2, "0")}</td>
              <td>
                <strong>{p.title}</strong>
                <span className="slug">/{p.slug}</span>
              </td>
              <td>{p.category}</td>
              <td>{p.year}</td>
              <td>{p.published ? <span className="ok">live</span> : "hidden"}</td>
              <td>
                <div className="admin-actions">
                  <Link className="fbtn" href={`/admin/projects/${p.slug}`}>
                    Edit
                  </Link>
                  <Link className="fbtn" href={`/work/${p.slug}`} target="_blank">
                    View ↗
                  </Link>
                  <form action={deleteProject.bind(null, p.slug)}>
                    <ConfirmButton
                      label="Delete"
                      message={`Delete "${p.title}" permanently? This cannot be undone.`}
                    />
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
