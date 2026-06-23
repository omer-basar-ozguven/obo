"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { SocialIcon } from "@/components/SocialIcon";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const wordItem = {
  hidden: { opacity: 0, y: 48, rotate: 4 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 14, mass: 0.8 },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-20"
    >
      {/* Animated background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-10 h-112 w-md rounded-full bg-accent/20 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-0 h-104 w-104 rounded-full bg-accent-2/15 blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% -20%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%)",
          }}
        />
      </div>

      <motion.div
        className="mx-auto w-full max-w-5xl lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Text column */}
        <div>
          {/* Mobile avatar */}
          {portfolio.avatarUrl && (
            <motion.div variants={item} className="mb-8 lg:hidden">
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.name}
                className="h-20 w-20 rounded-full border border-border object-cover"
              />
            </motion.div>
          )}

          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for new opportunities
          </motion.span>

          <motion.h1
            variants={wordContainer}
            className="mt-6 font-display text-5xl font-bold leading-[1.15] tracking-tight sm:text-7xl md:text-8xl"
          >
            {portfolio.name.split(" ").map((word, i) => (
              <span
                key={i}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.22em", paddingTop: "0.1em" }}
              >
                <motion.span
                  variants={wordItem}
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-2xl font-display text-2xl font-medium tracking-tight sm:text-4xl"
          >
            <span className="text-gradient">{portfolio.tagline}</span>
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {portfolio.summary}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" />
              {portfolio.location}
            </span>
            <span className="font-mono">{portfolio.role}</span>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-transform hover:scale-105"
            >
              View my work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 font-medium text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-3">
            {portfolio.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/50 text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
              >
                <SocialIcon name={social.icon} className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Desktop photo */}
        {portfolio.avatarUrl && (
          <motion.div variants={item} className="hidden lg:block">
            <div className="h-[460px] w-[345px] overflow-hidden rounded-3xl border-2 border-accent/40">
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.name}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
