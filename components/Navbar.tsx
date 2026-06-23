"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Home, User, Briefcase, Code2, GraduationCap, Mail, Sun, Moon, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { portfolio } from "@/data/portfolio";

const NAV_ITEMS = [
  { label: "Home",      href: "#top",       icon: Home },
  { label: "About",     href: "#about",     icon: User },
  { label: "Projects",  href: "#projects",  icon: Briefcase },
  { label: "Skills",    href: "#skills",    icon: Code2 },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Contact",   href: "#contact",   icon: Mail },
];

const MOBILE_LINKS = NAV_ITEMS.filter((n) => n.href !== "#top");

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState("#top");
  const [open, setOpen] = useState(false);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.replace("#", "")).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const initials = portfolio.name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();

  return (
    <>
      {/* ── Floating icon pill (desktop + tablet) ── */}
      <nav
        aria-label="Site navigation"
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-full border border-border bg-surface/80 p-2 backdrop-blur-xl md:flex"
      >
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = active === href;
          return (
            <a
              key={href}
              href={href}
              aria-label={label}
              title={label}
              className={`group relative grid h-10 w-10 place-items-center rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-accent/20 text-accent"
                  : "text-muted hover:bg-foreground/8 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {/* Tooltip */}
              <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </a>
          );
        })}

        {/* Divider */}
        <span className="my-1 h-px w-6 bg-border" />

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="grid h-10 w-10 place-items-center rounded-full text-muted transition-all hover:bg-foreground/8 hover:text-foreground"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Mobile: floating hamburger ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/90 text-foreground backdrop-blur md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : (
          <span className="flex flex-col gap-[5px]">
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-3 bg-foreground" />
          </span>
        )}
      </button>

      {/* ── Mobile: slide-in menu ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-50 flex h-screen w-72 flex-col border-l border-border bg-surface p-8 md:hidden"
            >
              <div className="flex items-center justify-between">
                <a
                  href="#top"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-sm font-bold text-white"
                >
                  {initials}
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-12 flex flex-1 flex-col gap-2">
                {MOBILE_LINKS.map(({ label, href, icon: Icon }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-display text-lg font-semibold text-foreground transition-colors hover:bg-foreground/5 hover:text-accent"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    {label}
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  Get in touch
                </a>
                <button
                  onClick={toggle}
                  aria-label="Toggle theme"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted hover:border-accent hover:text-foreground"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
