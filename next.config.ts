import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
