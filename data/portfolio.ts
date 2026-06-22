/**
 * Single source of truth for all portfolio content.
 *
 * Edit the values below to make this site yours. Everything the UI renders
 * (hero text, about, projects, skills, contact links) is driven from here.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** lucide-react icon name, resolved in components/SocialIcon.tsx */
  icon: "github" | "linkedin" | "twitter" | "mail" | "globe";
};

export type Project = {
  title: string;
  description: string;
  /** e.g. "2024", "Open source", "Side project" */
  tag?: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Emoji or short label shown in the card header if no image */
  accent?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Portfolio = {
  name: string;
  /** Short role line shown under the name */
  role: string;
  /** Big punchy tagline in the hero */
  tagline: string;
  /** One-line summary used for SEO description + hero subtext */
  summary: string;
  location: string;
  /** Used for the mailto contact button */
  email: string;
  resumeUrl?: string;
  socials: SocialLink[];
  about: {
    paragraphs: string[];
    /** Quick highlight stats shown beside the bio */
    highlights: { label: string; value: string }[];
    company: {
      name: string;
      role: string;
      blurb: string;
      url?: string;
    };
  };
  projects: Project[];
  skills: SkillGroup[];
};

export const portfolio: Portfolio = {
  name: "Omer Bayram",
  role: "Software Engineer & Co-Founder",
  tagline: "I build products people love to use.",
  summary:
    "Software engineer and co-founder focused on shipping fast, reliable, and delightful web applications from idea to scale.",
  location: "Remote",
  email: "you@example.com",
  resumeUrl: undefined,
  socials: [
    { label: "GitHub", href: "https://github.com/yourhandle", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourhandle",
      icon: "linkedin",
    },
    { label: "X", href: "https://x.com/yourhandle", icon: "twitter" },
    { label: "Email", href: "mailto:you@example.com", icon: "mail" },
  ],
  about: {
    paragraphs: [
      "I'm a software engineer who loves turning ambiguous problems into clean, well-crafted products. Over the years I've worked across the stack, from pixel-perfect interfaces to the systems that power them.",
      "As a co-founder, I wear a lot of hats, balancing engineering with product strategy, and shipping decisions. I care deeply about user experience, performance, and writing code that the team can build on for years.",
    ],
    highlights: [
      { label: "Years building", value: "5+" },
      { label: "Products shipped", value: "12+" },
      { label: "Company", value: "Co-Founder" },
    ],
    company: {
      name: "Your Company",
      role: "Co-Founder & Engineer",
      blurb:
        "We're building tools that help teams move faster without sacrificing quality. I lead engineering and shape the product from the ground up.",
      url: "https://yourcompany.com",
    },
  },
  projects: [
    {
      title: "Flagship Product",
      description:
        "The core platform behind my company, built for speed and scale. Real-time collaboration, a polished UI, and an architecture designed to grow.",
      tag: "Co-Founder",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
      liveUrl: "https://yourcompany.com",
      accent: "🚀",
    },
    {
      title: "Open Source Library",
      description:
        "A developer tool that takes the pain out of a common workflow. Well-documented, thoroughly tested, and used by developers worldwide.",
      tag: "Open source",
      tech: ["TypeScript", "Node.js", "Vitest"],
      repoUrl: "https://github.com/yourhandle/project",
      accent: "📦",
    },
    {
      title: "Side Project",
      description:
        "A weekend experiment that turned into something people actually use. A great playground for trying out new ideas and technologies.",
      tag: "2025",
      tech: ["React", "Framer Motion", "Supabase"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/yourhandle/side-project",
      accent: "✨",
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "SQL", "Go"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Backend",
      items: ["Node.js", "PostgreSQL", "REST", "GraphQL", "Redis"],
    },
    {
      category: "Tooling & Cloud",
      items: ["Docker", "AWS", "Vercel", "Git", "CI/CD"],
    },
  ],
};
