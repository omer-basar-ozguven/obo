import { Mail, Globe } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { SocialLink } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";

const ICONS: Record<SocialLink["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  mail: Mail,
  globe: Globe,
};

export function SocialIcon({
  name,
  className,
}: {
  name: SocialLink["icon"];
  className?: string;
}) {
  const Icon = ICONS[name] ?? Globe;
  return <Icon className={className} aria-hidden />;
}
