import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/db";

// Re-fetch DB content at most once per hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Y/B — websites, security audits and custom systems. Every project built like a product and audited like a target.",
};

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <section style={{ padding: "200px 0 120px" }}>
        <div className="wrap">
          <Reveal>
            <div className="lab">Selected work — {projects.length} projects</div>
            <h1 className="contact-h">
              Projects<span className="dot">.</span>
            </h1>
            <p style={{ color: "var(--mut)", maxWidth: 560, fontSize: 18 }}>
              Websites, security engagements and internal systems. Each one
              built like a product and audited like a target — click through
              for the full case study.
            </p>
          </Reveal>
          <div style={{ marginTop: 40 }}>
            <ProjectsGrid projects={projects} />
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#050505",
          borderTop: "1px solid var(--line)",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <div className="wrap">
          <Reveal>
            <h2 className="h2">
              Yours could be next<span className="dot">.</span>
            </h2>
            <Link className="btn solid" href="/#contact">
              Start a Project →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
