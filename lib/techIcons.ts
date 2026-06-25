/**
 * Maps technology display names to an icon source.
 *
 * Most icons come from the Simple Icons CDN:
 *   https://cdn.simpleicons.org/{slug}
 *
 * A few (e.g. AWS) are not in Simple Icons and use the Devicon CDN instead.
 * Entries without a known source are omitted so the chip renders text-only.
 *
 * Returns null when there is no icon available.
 */

const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/** Icons sourced from Devicon (not available in Simple Icons). */
const DEVICON_MAP: Record<string, string> = {
  AWS: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
};

const TECH_ICON_MAP: Record<string, string> = {
  // Languages
  TypeScript: "typescript",
  JavaScript: "javascript",
  Dart: "dart",
  Python: "python",
  Go: "go",
  SQL: "postgresql",

  // Web & Frontend
  React: "react",
  "React Native": "react",
  "Next.js": "nextdotjs",
  "Tailwind CSS": "tailwindcss",
  "shadcn/ui": "shadcnui",

  // Mobile
  Flutter: "flutter",
  Expo: "expo",

  // Backend & APIs
  "Node.js": "nodedotjs",
  Hono: "hono",
  Express: "express",
  "Express.js": "express",
  FastAPI: "fastapi",

  // Data & Infrastructure
  Firebase: "firebase",
  "Firebase SDK": "firebase",
  "Firebase Functions": "firebase",
  Supabase: "supabase",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Redis: "redis",
  Docker: "docker",
  "Google Cloud": "googlecloud",
  Vercel: "vercel",
  Railway: "railway",

  // AI & Agents
  LangChain: "langchain",
  "Claude API": "anthropic",
  "Claude Code": "anthropic",
  // OpenAI, Apify, Fal.ai not in Simple Icons — rendered text-only

  // Store / distribution
  "Google Play Console": "googleplay",
  "App Store Connect": "apple",
  RevenueCat: "revenuecat",

  Cursor: "cursor",
};

export function getTechIconUrl(name: string): string | null {
  if (DEVICON_MAP[name]) return DEVICON_MAP[name];
  const slug = TECH_ICON_MAP[name];
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}`;
}
