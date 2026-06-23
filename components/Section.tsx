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
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {title}
            </h2>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
