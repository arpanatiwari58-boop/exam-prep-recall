import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /* config options here */ disable type checking other during build. othere checking if possible during building

  typescript: {
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
