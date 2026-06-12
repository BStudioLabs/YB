import { requireAdmin } from "@/lib/adminAuth";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProject() {
  await requireAdmin();
  return (
    <>
      <div className="admin-bar">
        <h1>
          New project<span className="dot">.</span>
        </h1>
      </div>
      <ProjectForm />
    </>
  );
}
