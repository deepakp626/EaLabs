import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
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
