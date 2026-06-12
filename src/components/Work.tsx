import Reveal from "@/components/Reveal";
import ProjectsGrid from "@/components/ProjectsGrid";

export default function Work() {
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
        <ProjectsGrid />
      </div>
    </section>
  );
}
