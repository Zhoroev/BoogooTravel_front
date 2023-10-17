/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['127.0.0.1', 'localhost'] // Update domains for images
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
};
module.exports = {
  ...nextConfig,
  output: 'standalone', // Add output to the merged configuration
};

const withVideos = require('next-videos');
module.exports = withVideos(nextConfig);
