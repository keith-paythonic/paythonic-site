import type { NextConfig } from "next";

// Static export: the site is plain files (out/), served by any static host (S3 + CloudFront, EC2, Vercel).
// No server runtime, so nothing here may rely on one (no rewrites, headers, server actions, ISR).
// Security headers (CSP, HSTS, etc.) must be set by the host that serves out/, not here.
const nextConfig: NextConfig = {
  output: "export",
  // /solutions -> /solutions/index.html, so every page opens directly from a link or refresh
  // (the old site 404s on direct loads of every page except Home).
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
