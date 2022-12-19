/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['react-icons']);

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  }
}

module.exports = withTM(nextConfig)
