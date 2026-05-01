/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.110.172'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  experimental: { serverActions: { bodySizeLimit: '5mb' } },
};

export default nextConfig;
