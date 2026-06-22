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

export type ProjectStatus = "live" | "finished" | "in-progress";

export type ProjectType = "product" | "consulting";

export type Project = {
  title: string;
  description: string;
  /** Defaults to "product" when omitted */
  type?: ProjectType;
  /** e.g. "iOS & Android", "B2B", "Open Source", "Side project" */
  tag?: string;
  status?: ProjectStatus;
  tech?: string[];
  /** Landing page or web app URL */
  liveUrl?: string;
  /** iOS App Store URL */
  appStoreUrl?: string;
  /** Google Play Store URL */
  playStoreUrl?: string;
  /** Public GitHub repo URL */
  repoUrl?: string;
  /** App icon image URL — used instead of accent emoji when provided */
  iconUrl?: string;
  /** Emoji shown in the card header when no iconUrl */
  accent?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  url?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  certificateUrl?: string;
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
  /** Profile photo shown in the hero */
  avatarUrl?: string;
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
  education: Education[];
  certifications: Certification[];
};

export const portfolio: Portfolio = {
  name: "Ömer Başar Özgüven",
  role: "Software Engineer",
  tagline: "I build things that ship.",
  summary:
    "Co-founder of Bronix and full-stack engineer who turns ideas into real products — mobile apps, AI tools, and web platforms from zero to launch.",
  location: "Turkey",
  email: "omerbasarozguven@gmail.com",
  resumeUrl: undefined,
  avatarUrl: "/icons/obo.jpeg",
  socials: [
    { label: "GitHub", href: "https://github.com/yourhandle", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/omerbasarozguven/",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:omerbasarozguven@gmail.com", icon: "mail" },
  ],
  about: {
    paragraphs: [
      "I'm a software engineer who co-founded Bronix, a product studio where I led engineering across more than a dozen consumer apps from zero to launch — couples tools, AI interior design, safe-walking navigation, a doctor-facing EMR, a freight marketplace and so on. Each product taught me something the next one benefited from.",
      "My stack is deliberately broad: Flutter and Expo for mobile, Next.js for web and admin dashboards, Golang and Python for REST APIs and data pipelines, Firebase and Supabase on the backend, and increasingly AI-native tooling with VoltAgent, OpenRouter, and Fal.ai. I've also worked with big data systems and care as much about shipping something people actually pay for as I do about clean architecture.",
    ],
    highlights: [
      { label: "Products shipped", value: "10+" },
      { label: "Platforms", value: "Mobile & Web" },
      { label: "Available", value: "Now" },
    ],
    company: {
      name: "Bronix",
      role: "Previously · Co-Founder",
      blurb:
        "A product studio I co-founded and led engineering at — shipping subscription mobile apps and AI-powered tools across Flutter, Expo, and Next.js, from architecture decisions to App Store release.",
      url: "https://bronixengineering.com",
    },
  },
  projects: [
    {
      title: "Walkable",
      description:
        "AI-powered walking navigation that color-codes streets by walkability so you always take the safest route through any city. Privacy-first — no account required, location stays on your device.",
      tag: "iOS",
      status: "live",
      tech: ["Flutter", "VoltAgent"],
      liveUrl: "https://walkable.bronixlabs.com/",
      appStoreUrl: "https://apps.apple.com/app/id6762026493",
      iconUrl: "https://www.bronixengineering.com/images/walkable-app-icon.png",
    },
    {
      title: "Toxic Flamingo",
      description:
        "A to-do app with attitude — it nags, roasts, and guilt-trips you until tasks are actually done. Rage Mode, app blocking, and a Pomodoro timer for people who need accountability with a personality.",
      tag: "iOS",
      status: "live",
      appStoreUrl: "https://apps.apple.com/app/id6759795623",
      iconUrl: "https://www.bronixengineering.com/images/toxic-flamingo-app-icon.png",
    },
    {
      title: "NextRoom",
      description:
        "AI interior design app that transforms any space — indoors, outdoors, or landscape — with a single photo and a style choice. Pick from 12+ curated styles or write your own prompt and get a stunning redesign in seconds.",
      tag: "iOS",
      status: "live",
      appStoreUrl: "https://apps.apple.com/app/id6761188961",
      iconUrl: "https://www.bronixengineering.com/images/nextroom-app-icon.png",
    },
    {
      title: "yükAl",
      description:
        "Turkish freight marketplace connecting cargo owners with truck drivers — post a shipment, get matched instantly, and reach thousands of vehicles across all 81 provinces. Free to list, subscription-based for carriers.",
      tag: "iOS & Android · Web",
      status: "live",
      liveUrl: "https://www.yukal.net/",
      appStoreUrl: "https://apps.apple.com/app/id1663676145",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.application.yukal",
      iconUrl: "/icons/yukal_icon.png",
    },
    {
      title: "Banana Labs",
      description:
        "AI creative studio for generating UGC videos, product shoots, and images — powered by a multi-model architecture that runs several AI models in parallel so you can compare outputs instantly.",
      tag: "Web App",
      status: "live",
      liveUrl: "https://bananalabs.co",
      iconUrl: "/icons/banana-labs-icon.png",
    },
  ],
  skills: [
    {
      category: "AI & Agents",
      items: ["VoltAgent", "LangChain", "OpenRouter", "Fal.ai", "Apify", "Claude API", "OpenAI API", "Cursor", "Claude Code"],
    },
    {
      category: "Data & Infrastructure",
      items: ["Firebase", "Supabase", "PostgreSQL", "MongoDB", "Redis", "PostGIS", "Docker", "Google Cloud", "AWS", "Vercel", "Railway"],
    },
    {
      category: "Mobile",
      items: ["Flutter", "Expo", "React Native", "Firebase SDK", "RevenueCat", "Google Play Console", "App Store Connect"],
    },
    {
      category: "Backend & APIs",
      items: ["Node.js", "Hono", "Express", "Fiber", "Django", "Firebase Functions"],
    },
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Dart", "Python", "Go", "SQL"],
    },
    {
      category: "Web & Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
    },
  ],
  education: [
    {
      degree: "B.Sc. Mechanical Engineering",
      institution: "Bilkent University",
      period: "2016 – 2021",
      url: "https://www.bilkent.edu.tr/",
    },
  ],
  certifications: [
    {
      name: "Claude Code 101",
      issuer: "Anthropic",
      year: "2026",
      certificateUrl: "https://verify.skilljar.com/c/q7s5bqdyhtj7",
    },
    {
      name: "Claude Platform 101",
      issuer: "Anthropic",
      year: "2026",
      certificateUrl: "https://verify.skilljar.com/c/zzocwpy8rytv",
    },
  ],
};
