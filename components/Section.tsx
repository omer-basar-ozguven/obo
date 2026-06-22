import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

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
        <Reveal className="mb-12">
          {eyebrow && (
            <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-accent-soft">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {title}
            </h2>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
