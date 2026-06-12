import { saveProject } from "@/app/admin/actions";
import type { ProjectCategory } from "@/data/projects";

export interface ProjectFormData {
  slug: string;
  title: string;
  year: string;
  category: ProjectCategory | string;
  tags: string[];
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  results: string[];
  sort_order: number;
  published: boolean;
}

/** Create/edit form. Pass `project` for editing, omit for a new one. */
export default function ProjectForm({ project }: { project?: ProjectFormData }) {
  return (
    <form action={saveProject} className="admin-form">
      <input type="hidden" name="originalSlug" value={project?.slug ?? ""} />

      <div className="row">
        <label htmlFor="p-title">Title</label>
        <input id="p-title" name="title" defaultValue={project?.title} required />
      </div>
      <div className="row">
        <label htmlFor="p-slug">Slug (URL)</label>
        <input
          id="p-slug"
          name="slug"
          defaultValue={project?.slug}
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          title="lowercase letters, numbers and hyphens"
          required
        />
      </div>

      <div className="row">
        <label htmlFor="p-year">Year</label>
        <input id="p-year" name="year" defaultValue={project?.year ?? "2026"} pattern="[0-9]{4}" required />
      </div>
      <div className="row">
        <label htmlFor="p-cat">Category</label>
        <select id="p-cat" name="category" defaultValue={project?.category ?? "web"}>
          <option value="web">web</option>
          <option value="security">security</option>
          <option value="systems">systems</option>
        </select>
      </div>

      <div className="row">
        <label htmlFor="p-tags">Tags (comma-separated)</label>
        <input id="p-tags" name="tags" defaultValue={project?.tags.join(", ")} />
      </div>
      <div className="row">
        <label htmlFor="p-stack">Tech stack (comma-separated)</label>
        <input id="p-stack" name="stack" defaultValue={project?.stack.join(", ")} />
      </div>

      <div className="row full">
        <label htmlFor="p-summary">Summary (one line, shown on cards)</label>
        <input id="p-summary" name="summary" defaultValue={project?.summary} />
      </div>

      <div className="row full">
        <label htmlFor="p-problem">The problem — markdown</label>
        <textarea id="p-problem" name="problem" className="mdarea" defaultValue={project?.problem} />
      </div>
      <div className="row full">
        <label htmlFor="p-solution">The solution — markdown</label>
        <textarea id="p-solution" name="solution" className="mdarea" defaultValue={project?.solution} />
      </div>
      <div className="row full">
        <label htmlFor="p-results">Results (one per line)</label>
        <textarea id="p-results" name="results" className="mdarea short" defaultValue={project?.results.join("\n")} />
      </div>

      <div className="row">
        <label htmlFor="p-order">Sort order</label>
        <input id="p-order" name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} />
      </div>
      <div className="row check">
        <label htmlFor="p-pub">
          <input
            id="p-pub"
            name="published"
            type="checkbox"
            defaultChecked={project?.published ?? true}
          />{" "}
          Published (visible on the site)
        </label>
      </div>

      <div className="full">
        <button className="btn solid" type="submit">
          Save project →
        </button>
      </div>
    </form>
  );
}
