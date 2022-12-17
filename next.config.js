/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['react-icons']);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.pngmart.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = withTM(nextConfig)
