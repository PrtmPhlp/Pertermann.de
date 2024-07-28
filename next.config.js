const { withContentlayer } = require('next-contentlayer');
const { withPlausibleProxy } = require('next-plausible');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // other configurations can be added here
};

// Apply the withContentlayer and withPlausibleProxy wrappers
// module.exports = withPlausibleProxy()(withContentlayer(nextConfig));
module.exports = {
  async rewrites() {
    return [
      {
        destination: 'https://plausible.pertermann.de/js/script.js',
        source: '/js/script.js',
      },
      {
        // Or '/api/event/' if you have `trailingSlash: true` in this config
destination: 'https://plausible.pertermann.de/api/event', 
        source: '/api/event',
      },
    ];
  },
};
