import { GraduationCap, BadgeCheck, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function Education() {
  const { education, certifications } = portfolio;

  return (
    <Section id="education" eyebrow="Background" title="Education & certifications">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Education */}
        <Reveal direction="up">
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
              Education
            </h3>
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 p-7"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/10 blur-2xl" />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {edu.period}
                </p>
                <h4 className="mt-2 font-display text-2xl font-bold tracking-tight">
                  {edu.degree}
                </h4>
                <p className="mt-1 text-lg text-muted">{edu.institution}</p>
                {edu.url && (
                  <a
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-soft"
                  >
                    Visit university
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal direction="left" delay={0.1}>
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
              Certifications
            </h3>
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface/50 px-6 py-5 transition-colors hover:border-accent-soft/50"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{cert.name}</p>
                    <p className="mt-0.5 text-sm text-muted">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                </div>
                {cert.certificateUrl && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${cert.name} certificate`}
                    className="shrink-0 text-muted transition-colors hover:text-accent-soft"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
