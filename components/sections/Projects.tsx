"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { portfolio, type Project } from "@/data/portfolio";
import { GithubIcon } from "@/components/icons";

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={item}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/50 p-7 transition-colors hover:border-accent-soft/60"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:from-accent/10 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <span className="text-4xl" aria-hidden>
          {project.accent ?? "💡"}
        </span>
        {project.tag && (
          <span className="rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent-soft">
            {project.tag}
          </span>
        )}
      </div>

      <h3 className="relative mt-5 font-display text-xl font-bold tracking-tight">
        {project.title}
      </h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md bg-foreground/5 px-2.5 py-1 font-mono text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex items-center gap-4 border-t border-border pt-5">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-soft"
          >
            <ExternalLink className="h-4 w-4" /> Live
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
    </motion.article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-accent-soft">
          Work
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Selected projects
        </h2>
      </motion.div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {portfolio.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
