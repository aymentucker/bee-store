import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'beekeeper-store.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

