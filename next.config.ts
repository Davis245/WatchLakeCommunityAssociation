import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Workers doesn't support Node.js image optimization.
  // Use Cloudflare Images or unoptimized images instead.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
