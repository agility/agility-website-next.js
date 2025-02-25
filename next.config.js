/** @type {import('next').NextConfig} */
const nextConfig = {
	//output: "standalone", //this is only for next.js on Azure Static Web Apps...
	experimental: {
		// one year in seconds for the stale-while-revalidate cache-control
		swrDelta: 31536000,
		//useLightningcss: true,
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
	}
}

module.exports = nextConfig
