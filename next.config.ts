import type { NextConfig } from "next";

const exportForPages = process.env.BUILD_TARGET === "github-pages";
const basePath = exportForPages
  ? (process.env.PAGES_BASE_PATH ?? "/durian")
  : "";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(exportForPages && {
    output: "export",
    basePath,
    trailingSlash: true,
    // Our UI routes use .tsx. The Node-only API route.ts files stay out of Pages.
    pageExtensions: ["tsx"],
    images: { unoptimized: true },
  }),
};

export default nextConfig;
