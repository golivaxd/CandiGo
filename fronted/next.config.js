/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://votacion-api-7592.onrender.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
