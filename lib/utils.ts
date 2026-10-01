export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Prefix a /public asset path with the configured base path (GitHub Pages project sites). */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path || /^(https?:|data:|mailto:)/.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Absolute public URL for SEO tags (includes the base path via NEXT_PUBLIC_SITE_URL). */
export function absoluteUrl(path = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenhoangson.github.io").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
