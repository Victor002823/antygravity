/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-23557c39f90d46d584f7e9b28f7dff3b.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
