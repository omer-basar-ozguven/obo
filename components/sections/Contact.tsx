import { Mail } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { SocialIcon } from "@/components/SocialIcon";

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/60 px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]" />
            <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-accent-2/20 blur-[100px]" />
          </div>

          <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent-soft">
            Contact
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Let&apos;s build something{" "}
            <span className="text-gradient">great together</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Have a project in mind, a role to fill, or just want to say hi? My
            inbox is always open.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${portfolio.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-white transition-transform hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              {portfolio.email}
            </a>
            {portfolio.resumeUrl && (
              <a
                href={portfolio.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium text-foreground transition-colors hover:border-accent-soft hover:text-accent-soft"
              >
                Download résumé
              </a>
            )}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            {portfolio.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background/50 text-muted transition-all hover:-translate-y-0.5 hover:border-accent-soft hover:text-foreground"
              >
                <SocialIcon name={social.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
