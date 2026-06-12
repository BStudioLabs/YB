import Reveal from "@/components/Reveal";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/db";

export default async function Work() {
  const projects = await getProjects();
  return (
    <section
      id="work"
      style={{
        background: "#050505",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <Reveal>
          <div className="lab">02 — Selected work</div>
          <h2 className="h2">
            Projects<span className="dot">.</span>
          </h2>
        </Reveal>
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
