import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${portfolio.name} — ${portfolio.role}`,
  description: portfolio.summary,
  keywords: [
    portfolio.name,
    "software engineer",
    "co-founder",
    "portfolio",
    "web developer",
  ],
  authors: [{ name: portfolio.name }],
  openGraph: {
    title: `${portfolio.name} — ${portfolio.role}`,
    description: portfolio.summary,
    type: "website",
    siteName: portfolio.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.name} — ${portfolio.role}`,
    description: portfolio.summary,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
