/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-49eda2722f8e480d9a3801c4aa48e1d1.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
