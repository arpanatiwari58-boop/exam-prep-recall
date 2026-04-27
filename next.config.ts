import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /* config options here */ disable type checking other during build. othere checking if possible during building
// images.unsplash.com
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  
};

export default nextConfig;
