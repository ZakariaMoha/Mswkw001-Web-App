/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [],
  experimental: {
    serverComponentsExternalPackages: ['google-spreadsheet', 'google-auth-library'],
  },
};

module.exports = nextConfig;
