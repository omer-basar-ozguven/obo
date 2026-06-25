"use client";

import { useState } from "react";
import { AnimatePresence, motion as m } from "motion/react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { portfolio, type Project, type ProjectStatus, type ProjectType } from "@/data/portfolio";
import { getTechIconUrl } from "@/lib/techIcons";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

const cardsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardReveal = {
  hidden: { opacity: 0, scale: 0.88, rotateX: 12, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: { type: "spring" as const, stiffness: 65, damping: 16, mass: 0.8 },
  },
};

const statusStyles: Record<ProjectStatus, string> = {
  live: "border-accent-soft/40 bg-accent/10 text-accent-soft",
  finished: "border-border bg-background/60 text-muted",
  "in-progress": "border-amber-500/30 bg-amber-500/10 text-amber-400",
};

const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  finished: "Finished",
  "in-progress": "In Progress",
};

const typeStyles: Record<ProjectType, string> = {
  product: "border-accent-soft/40 bg-accent/10 text-accent-soft",
  consulting: "border-teal-500/40 bg-teal-500/10 text-teal-400",
  playground: "border-violet-500/40 bg-violet-500/10 text-violet-400",
};

const typeLabels: Record<ProjectType, string> = {
  product: "Product",
  consulting: "Consulting",
  playground: "Playground",
};

function ProjectCard({ project }: { project: Project }) {
  const hasRole = Boolean(project.role);
  const [tab, setTab] = useState<"description" | "role">(hasRole ? "role" : "description");

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/50 p-7 transition-colors hover:border-accent-soft/60"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent)" }}
      />

      <div className="relative flex items-start justify-between gap-3">
        {project.iconUrl ? (
          <img
            src={project.iconUrl}
            alt={`${project.title} icon`}
            className="h-14 w-14 rounded-2xl object-cover"
          />
        ) : (
          <span className="text-4xl" aria-hidden>
            {project.accent ?? "💡"}
          </span>
        )}
        <div className="flex flex-wrap items-center justify-end gap-2">
          {(project.type ?? "product") && (
            <span className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${typeStyles[project.type ?? "product"]}`}>
              {typeLabels[project.type ?? "product"]}
            </span>
          )}
          {project.status && (
            <span className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${statusStyles[project.status]}`}>
              {statusLabels[project.status]}
            </span>
          )}
          {project.tag && (
            <span className="rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted">
              {project.tag}
            </span>
          )}
        </div>
      </div>

      <h3 className="relative mt-5 font-display text-xl font-bold tracking-tight">
        {project.title}
      </h3>
      {hasRole && (
        <div className="relative mt-3 flex gap-1">
          {(["description", "role"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                tab === t
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t === "description" ? "Project" : "My Role"}
            </button>
          ))}
        </div>
      )}

      <div className="relative mt-3 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <m.p
            key={hasRole ? tab : "desc"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="leading-relaxed text-muted"
          >
            {tab === "role" && project.role ? project.role : project.description}
          </m.p>
        </AnimatePresence>
      </div>

      {project.tech && project.tech.length > 0 && (
        <div className="relative mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => {
            const iconUrl = getTechIconUrl(t);
            return (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground/5 px-3 py-1.5 font-mono text-sm text-muted"
              >
                {iconUrl && (
                  <span className="inline-flex items-center justify-center rounded-[5px] bg-white p-[3px]">
                    <img
                      src={iconUrl}
                      alt=""
                      aria-hidden
                      width={21}
                      height={21}
                      className="block shrink-0"
                    />
                  </span>
                )}
                {t}
              </span>
            );
          })}
        </div>
      )}

      {(project.liveUrl || project.appStoreUrl || project.playStoreUrl || project.repoUrl) && (
        <div className="relative mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-soft"
            >
              <ExternalLink className="h-4 w-4" /> Website
            </a>
          )}
          {project.appStoreUrl && (
            <a
              href={project.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-soft"
            >
              <ExternalLink className="h-4 w-4" /> App Store
            </a>
          )}
          {project.playStoreUrl && (
            <a
              href={project.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-soft"
            >
              <ExternalLink className="h-4 w-4" /> Play Store
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-soft"
            >
              <GithubIcon className="h-4 w-4" /> Code
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-28"
    >
      <Reveal className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Work
          </p>
        </div>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Selected projects
        </h2>
      </Reveal>

      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: "1200px" }}
        variants={cardsContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {portfolio.projects.map((project) => (
          <motion.div key={project.title} variants={cardReveal} className="flex">
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
