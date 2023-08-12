/** @type {import('next').NextConfig} */
const nextConfig = {
  // exclude: ['ML_AI_Algorithm'],
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['www.bigbasket.com'],
}

};

module.exports = nextConfig;
