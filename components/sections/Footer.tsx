"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { SocialIcon } from "@/components/SocialIcon";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <motion.div
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
      >
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-bold tracking-tight">
            {portfolio.name}
          </p>
          <p className="mt-1 text-sm text-muted">
            &copy; {new Date().getFullYear()} {portfolio.name}. All rights
            reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {portfolio.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={social.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-foreground"
            >
              <SocialIcon name={social.icon} className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
