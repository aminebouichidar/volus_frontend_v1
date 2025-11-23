import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "volus-public.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
    formats: ["image/webp"],
  },

  // output: 'standalone',
  // trailingSlash: true,
};

export default nextConfig;
