import { ArrowUpRight, Building2 } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function About() {
  const { paragraphs, highlights, company } = portfolio.about;

  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal direction="up">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-border bg-surface/50 p-5"
              >
                <div className="font-display text-3xl font-bold text-gradient">
                  {h.value}
                </div>
                <div className="mt-1 text-sm text-muted">{h.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface/60 p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
                <Building2 className="h-6 w-6" />
              </span>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
                {company.role}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {company.name}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{company.blurb}</p>
              {company.url && (
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-soft"
                >
                  Visit the company
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
