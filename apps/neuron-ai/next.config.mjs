/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
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
