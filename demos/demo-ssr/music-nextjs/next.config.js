const withTM = require('next-transpile-modules')(['antd-mobile'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['y.gtimg.cn', 'y.qq.com'],
  }
}

module.exports = withTM(nextConfig)
