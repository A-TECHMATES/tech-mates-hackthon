/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  output: 'export',
  basePath: '/tech-mates-hackthon',
  assetPrefix: '/tech-mates-hackthon/',
};

module.exports = nextConfig;
