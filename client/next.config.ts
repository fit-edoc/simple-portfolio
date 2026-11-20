import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  productionBrowserSourceMaps: false,
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;