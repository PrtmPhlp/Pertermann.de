const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['troika-three-text'],
  webpack: (config) => {
    config.module.rules.push({
      test: /troika-three-text\.esm\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });
    return config;
  },
};

module.exports = withContentlayer(nextConfig);
