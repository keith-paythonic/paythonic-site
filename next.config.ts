import type { NextConfig } from "next";

// GitHub Pages serves this repo at /paythonic-site/; the Pages workflow sets PAGES_BASE_PATH. Unset = site at the root
// (local dev, or a custom domain such as paythonic.ai).
const basePath = process.env.PAGES_BASE_PATH || "";

// Static export: the site is plain files (out/), served by any static host (GitHub Pages, S3 + CloudFront, Vercel).
// No server runtime, so nothing here may rely on one (no rewrites, headers, server actions, ISR).
// Security headers (CSP, HSTS, etc.) must be set by the host that serves out/, not here.
const nextConfig: NextConfig = {
  output: "export",
  // /solutions -> /solutions/index.html, so every page opens directly from a link or refresh
  // (the old site 404s on direct loads of every page except Home).
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath }, // for raw paths Next doesn't prefix itself (the favicon)
};

export default nextConfig;
