import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  productionBrowserSourceMaps: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',       // accept any hostname
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true, // ✅ merged here
  },
  
};

export default nextConfig;
