/** @type {import('next').NextConfig} */
const nextConfig = {
	//output: "standalone", //this is only for next.js on Azure Static Web Apps...
	experimental: {
		// one year in seconds for the stale-while-revalidate cache-control
		swrDelta: 31536000,
		optimizeCss: true
	},


	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.aglty.io',
			},
		],
		// Prefer AVIF (smaller than WebP), fall back to WebP for older browsers.
		// Browsers that support neither get the original format.
		formats: ['image/avif', 'image/webp'],
		// Cache optimized images for a year (Next.js default is 60 seconds, which
		// means images get re-optimized constantly). Sets the Cache-Control header
		// on /_next/image responses and controls server-side image cache lifetime.
		minimumCacheTTL: 31536000,
	},
	redirects() {
		return [
			{
				source: '/resources/posts/:path',
				destination: '/blog/:path',
				permanent: true,
			},
			{
				source: '/resources/category/:path',
				destination: '/resources?category=:path',
				permanent: true,
			},
			{
				source: '/resources/topic/:path',
				destination: '/resources?topic=:path',
				permanent: true,
			},
		]
	},
	async headers() {
		return [
			{
				source: '/:all*(svg|jpg|png|webp|avif|gif|ico|woff|woff2)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/_next/static/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		]
	}
}

module.exports = nextConfig
