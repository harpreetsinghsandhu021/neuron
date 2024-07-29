/** @type {import('next').NextConfig} */

import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
