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

export type ProjectType = "product" | "consulting" | "playground";

export type Project = {
  title: string;
  description: string;
  /** Defaults to "product" when omitted */
  type?: ProjectType;
  /** For consulting projects, shown separately below the description */
  role?: string;
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
  /** App icon image URL, used instead of accent emoji when provided */
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
  role: "Software & Product Engineer",
  tagline: "I build things that ship.",
  summary:
    "Co-founder of Bronix and a full-stack engineer. I build mobile apps, AI tools, and web platforms, and I take them all the way from idea to launch.",
  location: "Turkey",
  email: "omerbasarozguven@gmail.com",
  resumeUrl: undefined,
  avatarUrl: "/icons/obo.jpeg",
  socials: [
    { label: "GitHub", href: "https://github.com/omer-basar-ozguven", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/omerbasarozguven/",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:omerbasarozguven@gmail.com", icon: "mail" },
  ],
  about: {
    paragraphs: [
      "I'm a software engineer, and I co-founded Bronix, a product studio where I led engineering on more than a dozen consumer apps. I built all sorts of things there: couples tools, AI interior design, safe-walking navigation, a freight marketplace, and plenty more. Every one of them taught me something that I carried into the next.",
      "My stack is broad on purpose. Flutter and Expo for mobile, Next.js for web apps and admin dashboards, Go and Python for APIs and data pipelines, Firebase and Supabase on the backend, and more and more AI tooling like VoltAgent, OpenRouter, and Fal.ai. I've also worked on big data systems. Clean architecture matters to me, but shipping something people will actually benefit from, matters more.",
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
        "The product studio I co-founded and ran engineering for. We shipped subscription mobile apps and AI tools built on Flutter, Expo, and Next.js, and I owned the whole thing from architecture decisions down to the App Store release.",
      url: "https://bronixengineering.com",
    },
  },
  projects: [
    {
      title: "yükAl",
      description:
        "A Turkish freight marketplace that connects cargo owners with truck drivers. Post a shipment, get matched right away, and reach thousands of vehicles across all 81 provinces. Listing is free, and carriers pay through a subscription.",
      tag: "iOS & Android · Web",
      status: "live",
      tech: ["Expo", "Express.js", "Next.js", "Supabase", "Railway", "OpenRouter"],
      liveUrl: "https://www.yukal.net/",
      appStoreUrl: "https://apps.apple.com/app/id1663676145",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.application.yukal",
      iconUrl: "/icons/yukal_icon.png",
    },
    {
      title: "Walkable",
      description:
        "Walking navigation that color-codes streets by how walkable they are, so you can pick the safest route through any city. There's no account to sign up for, and your location never leaves your phone.",
      tag: "iOS",
      status: "live",
      tech: ["Flutter", "VoltAgent", "Firebase", "Supabase"],
      liveUrl: "https://walkable.bronixlabs.com/",
      appStoreUrl: "https://apps.apple.com/app/id6762026493",
      iconUrl: "https://www.bronixengineering.com/images/walkable-app-icon.png",
    },
    {
      title: "Toxic Flamingo",
      description:
        "A to-do app with an attitude. It nags, roasts, and guilt-trips you until your tasks are actually done. There's a Rage Mode, app blocking, and a Pomodoro timer for anyone whose accountability needs a personality.",
      tag: "iOS",
      status: "live",
      tech: ["Flutter", "Firebase"],
      appStoreUrl: "https://apps.apple.com/app/id6759795623",
      iconUrl: "https://www.bronixengineering.com/images/toxic-flamingo-app-icon.png",
    },
    {
      title: "NextRoom",
      description:
        "An AI interior design app that redesigns any space, whether it's indoors, outdoors, or a whole landscape, from one photo and a style. Pick one of 12+ curated styles or write your own prompt, and the finished redesign comes back in seconds.",
      tag: "iOS",
      status: "live",
      tech: ["Flutter", "Firebase", "Railway", "Fal.ai"],
      appStoreUrl: "https://apps.apple.com/app/id6761188961",
      iconUrl: "https://www.bronixengineering.com/images/nextroom-app-icon.png",
    },
    {
      title: "Mole",
      description:
        "A private AI platform that finds underground utilities from GPR survey data. It runs an ensemble of deep learning models to detect and locate buried pipes and cables, then plots them on an interactive map dashboard. It's in use at government agencies like MEDAS.",
      role: "Built the FastAPI backend pipeline, Supabase infrastructure, and key UI components for the client-facing dashboard.",
      tag: "Web App",
      status: "live",
      type: "consulting",
      tech: ["FastAPI", "Supabase", "Next.js", "Docker"],
      accent: "🔍",
    },
    {
      title: "Placemaking AI",
      description:
        "A real estate intelligence platform built on the largest data vault in placemaking: over 106M points of interest, plus consumer insights, cultural mapping, and sentiment analysis for landlords, developers, and urban planners.",
      role: "Responsible for big data pipeline architecture, microservices development, and data science workflows.",
      tag: "Web App",
      status: "live",
      type: "consulting",
      tech: ["Python", "FastAPI", "LangChain", "SQL", "AWS", "Docker"],
      liveUrl: "https://www.placemaking.ai/",
      accent: "🏙️",
    },
    {
      title: "Banana Labs",
      description:
        "An AI creative studio for making UGC videos, product shoots, and images. It runs several AI models in parallel, so you can generate a few versions and compare them side by side.",
      tag: "Web App",
      status: "live",
      tech: ["Next.js", "Express.js", "Supabase", "Fal.ai", "OpenRouter"],
      liveUrl: "https://bananalabs.co",
      iconUrl: "/icons/banana-labs-icon.png",
    },
    {
      title: "SeriesStudio",
      description:
        "An agentic pipeline that takes a short series idea and produces a full episodic video series from it: scripts, character sheets, storyboards, and rendered MP4 scenes, all generated on its own. The only thing you hand it is a few paragraphs describing the idea.",
      tag: "Open Source",
      status: "in-progress",
      type: "playground",
      tech: ["VoltAgent", "Docker"],
      repoUrl: "https://github.com/omer-basar-ozguven/voltagent-series-studio",
      accent: "🎬",
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
      items: ["Flutter", "Expo", "React Native", "Firebase SDK", "RevenueCat", "App Store Connect", "Google Play Console"],
    },
    {
      category: "Backend & APIs",
      items: ["Node.js", "Hono", "Express", "Fiber", "FastAPI", "Firebase Functions"],
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
    {
      name: "Claude Code in Action",
      issuer: "Anthropic",
      year: "2026",
      certificateUrl: "https://verify.skilljar.com/c/gbexkvzt4wot",
    },
    {
      name: "Introduction to Claude Cowork",
      issuer: "Anthropic",
      year: "2026",
      certificateUrl: "https://verify.skilljar.com/c/hjkdiwia7x3j",
    },
    {
      name: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      year: "2026",
      certificateUrl: "https://verify.skilljar.com/c/ecr3zo5jddiw",
    },
  ],
};
