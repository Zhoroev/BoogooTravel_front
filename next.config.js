/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['127.0.0.1.8000']
  },
  i18n: {
    locales: ['ru', 'en', 'de'],
    defaultLocale: 'ru'
  },
};
module.exports = {
  output: 'standalone',
}

const withVideos = require('next-videos')
module.exports = withVideos()

module.exports = nextConfig
