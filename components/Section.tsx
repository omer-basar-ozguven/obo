"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const wordItem = {
  hidden:   { opacity: 0, y: 36 },
  visible:  {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 75, damping: 16 },
  },
};

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-28 ${className ?? ""}`}
    >
      {(eyebrow || title) && (
        <Reveal className="mb-14">
          {eyebrow && (
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {eyebrow}
              </p>
            </div>
          )}
          {title && (
            <motion.h2
              className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
              variants={wordContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordItem}
                  style={{ display: "inline-block", marginRight: "0.22em" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
