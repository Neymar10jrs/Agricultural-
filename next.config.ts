import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/farm-digital-twin',
        destination: '/my-farm',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
