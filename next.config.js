/* Modified as per https://melvingeorge.me/blog/nextjs-pwa */
const withOffline = require("next-offline");

/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: '/u/:user*',
        destination: '/network/lookup/:user*',
        permanent: false,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 604800,
  }
}

module.exports = nextConfig;