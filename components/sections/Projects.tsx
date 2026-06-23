"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion as m } from "motion/react";
import { motion } from "motion/react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolio, type Project, type ProjectStatus, type ProjectType } from "@/data/portfolio";
import { GithubIcon } from "@/components/icons";

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
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-foreground/5 px-2.5 py-1 font-mono text-xs text-muted"
            >
              {t}
            </span>
          ))}
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.children[0] as HTMLElement | null;
    const amount = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

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

      <div className="relative">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to right, var(--background), transparent)",
            opacity: canScrollLeft ? 1 : 0,
          }}
        />
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className={`absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 backdrop-blur-sm transition-all duration-200 ${
            canScrollLeft
              ? "text-foreground hover:border-accent-soft hover:text-accent-soft"
              : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
          }}
        >
          {portfolio.projects.map((project) => (
            <div
              key={project.title}
              className="w-full shrink-0 lg:w-[calc(33.333%-16px)]"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Right fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to left, var(--background), transparent)",
            opacity: canScrollRight ? 1 : 0,
          }}
        />
        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className={`absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 backdrop-blur-sm transition-all duration-200 ${
            canScrollRight
              ? "text-foreground hover:border-accent-soft hover:text-accent-soft"
              : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
