/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'user-images.githubusercontent.com',
            'github.com',
            'raw.githubusercontent.com',
        ],
    },
};

module.exports = nextConfig;
