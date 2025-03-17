/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Required for app directory structure in Next 13
  },
};

module.exports = nextConfig;
