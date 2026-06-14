"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { categories, type Project, type ProjectCategory } from "@/data/projects";

/** Filterable project grid — shared by the home section and the /work page.
 *  Receives projects from a server component (Supabase or local fallback). */
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <Reveal>
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`fbtn ${filter === c.id ? "on" : ""}`}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </Reveal>
      {/* key swap = clean crossfade per filter; no layout animations to glitch */}
      <motion.div
        key={filter}
        className="wgrid"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {visible.map((p) => (
          <Link className="proj" href={`/work/${p.slug}`} key={p.slug}>
            <div className="cover">
              {p.image_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img className="cover-img" src={p.image_url} alt={p.title} loading="lazy" />
              ) : (
                <b>{String(projects.indexOf(p) + 1).padStart(2, "0")}</b>
              )}
              <span className="case">View case study →</span>
            </div>
            <div className="pmeta">
              <h3>
                {p.title} <span>{p.year}</span>
              </h3>
              <div className="tags">
                {p.tags.map((t) => (
                  <em key={t}>{t}</em>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </>
  );
}
