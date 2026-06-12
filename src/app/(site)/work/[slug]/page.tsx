import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Markdown from "@/components/Markdown";
import { projects as localProjects } from "@/data/projects";
import { getProjects } from "@/lib/db";

// Re-fetch DB content at most once per hour; slugs added in the DB
// after deploy still render on demand (dynamicParams is on by default).
export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return localProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <article>
        <div className="case-hero">
          <div className="wrap">
            <Reveal>
              <Link
                href="/work"
                className="more"
                style={{ marginBottom: 28, display: "inline-flex" }}
              >
                <i>←</i> All projects
              </Link>
              <div className="lab">
                Case study — {project.category} / {project.year}
              </div>
              <h1 className="h2">
                {project.title}
                <span className="dot">.</span>
              </h1>
              <p style={{ color: "var(--mut)", maxWidth: 640, fontSize: 18 }}>
                {project.summary}
              </p>
              <div className="tags" style={{ marginTop: 24 }}>
                {project.stack.map((t) => (
                  <em key={t}>{t}</em>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div
                className="case-cover"
                role="img"
                aria-label={`${project.title} cover placeholder`}
              >
                <b>{String(index + 1).padStart(2, "0")}</b>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="wrap">
          <div className="case-body">
            <Reveal>
              <h2>
                The problem<span className="dot">.</span>
              </h2>
              <Markdown>{project.problem}</Markdown>
            </Reveal>
            <Reveal delay={0.1}>
              <h2>
                The solution<span className="dot">.</span>
              </h2>
              <Markdown>{project.solution}</Markdown>
            </Reveal>
          </div>
          <Reveal>
            <div style={{ paddingBottom: 100 }}>
              <h2 style={{ fontSize: "1.8rem", marginBottom: 8 }}>
                Results<span className="dot">.</span>
              </h2>
              <ul className="results">
                {project.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <nav className="case-nav" aria-label="Project navigation">
          <Link href={`/work/${prev.slug}`}>
            <small>← Previous</small>
            <b>{prev.title}</b>
          </Link>
          <Link href={`/work/${next.slug}`}>
            <small>Next →</small>
            <b>{next.title}</b>
          </Link>
        </nav>
      </article>
    </>
  );
}
