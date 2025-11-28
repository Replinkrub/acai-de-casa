/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 31536000, // 1 ano
  },
}

module.exports = nextConfig
