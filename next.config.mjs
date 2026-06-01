/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.*.*',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '*.herokuapp.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: '*.herokuapp.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/media/**',
      },
      {
        protocol: process.env.NEXT_PUBLIC_API_BASE_URL?.split('://')[0] || 'http',
        hostname: process.env.NEXT_PUBLIC_API_BASE_URL?.split('://')[1]?.split(':')[0] || 'localhost',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
