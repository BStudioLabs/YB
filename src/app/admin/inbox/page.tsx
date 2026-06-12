import { requireAdmin } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { deleteMessage, setMessageHandled } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";

interface Msg {
  id: string;
  created_at: string;
  name: string;
  email: string;
  project_type: string | null;
  message: string;
  handled: boolean;
}

export default async function AdminInbox() {
  await requireAdmin();
  const sb = getSupabaseAdmin();
  if (!sb) {
    return <p className="form-fail">Supabase is not configured — check .env.local.</p>;
  }
  const { data, error } = await sb
    .from("contact_messages")
    .select("id, created_at, name, email, project_type, message, handled")
    .order("created_at", { ascending: false });
  if (error) return <p className="form-fail">DB error: {error.message}</p>;
  const msgs = (data ?? []) as Msg[];
  const open = msgs.filter((m) => !m.handled).length;

  return (
    <>
      <div className="admin-bar">
        <h1>
          Inbox<span className="dot">.</span>{" "}
          <small>
            {msgs.length} messages · {open} open
          </small>
        </h1>
      </div>
      {msgs.length === 0 && <p style={{ color: "var(--mut)" }}>Nothing yet.</p>}
      {msgs.map((m) => (
        <article key={m.id} className={`msg-card ${m.handled ? "handled" : ""}`}>
          <header>
            <strong>{m.name}</strong>
            <a href={`mailto:${m.email}`}>{m.email}</a>
            {m.project_type && <em>{m.project_type}</em>}
            <time dateTime={m.created_at}>
              {new Date(m.created_at).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </header>
          <p>{m.message}</p>
          <div className="admin-actions">
            <form action={setMessageHandled.bind(null, m.id, !m.handled)}>
              <button className="fbtn" type="submit">
                {m.handled ? "Reopen" : "Mark handled"}
              </button>
            </form>
            <form action={deleteMessage.bind(null, m.id)}>
              <ConfirmButton label="Delete" message="Delete this message permanently?" />
            </form>
          </div>
        </article>
      ))}
    </>
  );
}
