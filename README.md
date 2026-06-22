# Portfolio

A bold, animated personal portfolio for a software engineer & co-founder. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Motion** (the successor to Framer Motion).

Single page with anchored sections: Hero, About, Projects, Skills, and Contact.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing your content

All content lives in one typed file: **[`data/portfolio.ts`](data/portfolio.ts)**.

Update it to make the site yours — there's nothing to wire up:

- `name`, `role`, `tagline`, `summary`, `location`, `email`
- `socials` — links shown in the hero, contact, and footer. Each has an `icon` of `github | linkedin | twitter | mail | globe`.
- `about` — bio paragraphs, highlight stats, and your company / co-founder blurb.
- `projects` — array of cards (title, description, tech tags, optional `liveUrl` / `repoUrl`, and an `accent` emoji).
- `skills` — grouped by category.
- `resumeUrl` (optional) — when set, a "Download résumé" button appears in the Contact section.

The SEO metadata (title, description, Open Graph, Twitter card) in [`app/layout.tsx`](app/layout.tsx) is generated from this same file.

## Theming

Colors, fonts, and animations are defined as CSS variables in [`app/globals.css`](app/globals.css). Tweak the accent colors here:

```css
--accent: #7c5cff;
--accent-soft: #a48dff;
--accent-2: #19d3c5;
```

## Project structure

```
app/
  layout.tsx        Root layout, fonts, SEO metadata
  page.tsx          Composes the sections
  globals.css       Theme tokens, animations, utilities
components/
  Navbar.tsx        Sticky nav + mobile menu
  Section.tsx       Section wrapper with heading
  Reveal.tsx        Scroll-into-view animation helpers
  SocialIcon.tsx    Maps social icon names to components
  icons.tsx         Brand SVG icons (GitHub, LinkedIn, X)
  sections/         Hero, About, Projects, Skills, Contact, Footer
data/
  portfolio.ts      All site content (edit this)
```

## Build & deploy

```bash
npm run build   # production build
npm run start   # serve the production build
```

Deploys cleanly to [Vercel](https://vercel.com): push to a Git repo and import the project, or run `vercel`. No environment variables required.
