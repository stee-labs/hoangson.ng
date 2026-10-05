import { site, type SiteLinks } from "@/data/site";

export type ResolvedLink = { href: string; placeholder: boolean; external: boolean };

/** Resolve a profile link; empty values become disabled placeholders (never fake URLs). */
export function profileLink(kind: keyof SiteLinks): ResolvedLink {
  const value = site.links[kind];
  if (!value) return { href: "#", placeholder: true, external: false };
  if (kind === "email") return { href: `mailto:${value}`, placeholder: false, external: false };
  return { href: value, placeholder: false, external: true };
}
