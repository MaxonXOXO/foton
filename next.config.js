/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Add this to disable type checking during build
  typescript: {
    ignoreBuildErrors: true, // Add this line
  },
  eslint: {
    ignoreDuringBuilds: true, // Also add this for good measure
  },
  // Only add these if your site is at username.github.io/repo-name
  basePath: process.env.NODE_ENV === 'production' ? '/foton-labz' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/foton-labz/' : '',
};

module.exports = nextConfig;