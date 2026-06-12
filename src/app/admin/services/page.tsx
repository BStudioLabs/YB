import { requireAdmin } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { saveService } from "@/app/admin/actions";

interface Row {
  slug: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  published: boolean;
}

export default async function AdminServices() {
  await requireAdmin();
  const sb = getSupabaseAdmin();
  if (!sb) {
    return <p className="form-fail">Supabase is not configured — check .env.local.</p>;
  }
  const { data, error } = await sb
    .from("services")
    .select("slug, title, description, icon, sort_order, published")
    .order("sort_order");
  if (error) return <p className="form-fail">DB error: {error.message}</p>;
  const rows = (data ?? []) as Row[];

  return (
    <>
      <div className="admin-bar">
        <h1>
          Services<span className="dot">.</span> <small>{rows.length} cards</small>
        </h1>
      </div>
      {rows.map((s) => (
        <form key={s.slug} action={saveService} className="admin-form boxed">
          <input type="hidden" name="slug" value={s.slug} />
          <div className="row">
            <label htmlFor={`s-title-${s.slug}`}>Title</label>
            <input id={`s-title-${s.slug}`} name="title" defaultValue={s.title} required />
          </div>
          <div className="row">
            <label htmlFor={`s-order-${s.slug}`}>Sort order</label>
            <input id={`s-order-${s.slug}`} name="sort_order" type="number" defaultValue={s.sort_order} />
          </div>
          <div className="row full">
            <label htmlFor={`s-desc-${s.slug}`}>Description</label>
            <textarea id={`s-desc-${s.slug}`} name="description" className="mdarea short" defaultValue={s.description} />
          </div>
          <div className="row full">
            <label htmlFor={`s-icon-${s.slug}`}>Icon (SVG path data, 24×24)</label>
            <input id={`s-icon-${s.slug}`} name="icon" defaultValue={s.icon} />
          </div>
          <div className="row check">
            <label htmlFor={`s-pub-${s.slug}`}>
              <input id={`s-pub-${s.slug}`} name="published" type="checkbox" defaultChecked={s.published} />{" "}
              Published
            </label>
          </div>
          <div>
            <button className="btn solid" type="submit">
              Save →
            </button>
          </div>
        </form>
      ))}
    </>
  );
}
