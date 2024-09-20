/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'assets.aceternity.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: ''
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
