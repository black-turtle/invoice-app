/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    // enabled: process.env.ANALYZE === 'true',
    // enabled: true,
    enabled: false,
})
module.exports = withBundleAnalyzer(nextConfig)
