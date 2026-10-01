import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["/", "/work/", "/about/", "/lab/"].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({
    url: absoluteUrl(`/work/${p.slug}/`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...routes, ...work];
}
