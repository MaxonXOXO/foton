/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // This is what replaces next export
  distDir: 'out',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/foton' : '', // Change to your repo name
  assetPrefix: process.env.NODE_ENV === 'production' ? '/foton/' : '', // Change to your repo name
};

module.exports = nextConfig;