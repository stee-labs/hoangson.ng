import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * NEXT_PUBLIC_BASE_PATH is "" for a user site (username.github.io) and
 * "/<repo>" for a project site (e.g. "/portfolio"). The deploy workflow
 * sets it automatically from actions/configure-pages.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
