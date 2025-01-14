import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.tindo.com.br/:path*', // API remota
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  }
};

export default nextConfig;
