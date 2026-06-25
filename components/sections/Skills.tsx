import { portfolio } from "@/data/portfolio";
import { getTechIconUrl } from "@/lib/techIcons";
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
            <div className="mt-5 flex flex-wrap gap-3">
              {group.items.map((skill) => {
                const iconUrl = getTechIconUrl(skill);
                return (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/50 px-4 py-2.5 text-base text-muted transition-colors hover:border-accent-soft hover:text-foreground"
                  >
                    {iconUrl && (
                      <span className="inline-flex items-center justify-center rounded-[5px] bg-white p-[3px]">
                        <img
                          src={iconUrl}
                          alt=""
                          aria-hidden
                          width={18}
                          height={18}
                          className="block shrink-0"
                        />
                      </span>
                    )}
                    {skill}
                  </span>
                );
              })}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
