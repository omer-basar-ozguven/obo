import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/Section";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Toolkit" title="Skills & technologies">
      <RevealGroup className="grid gap-6 sm:grid-cols-2 items-start" stagger={0.12}>
        {portfolio.skills.map((group) => (
          <RevealItem
            key={group.category}
            className="rounded-3xl border border-border bg-surface/50 p-7"
          >
            <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
              {group.category}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm text-muted transition-colors hover:border-accent-soft hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
