/** @type {import('next').NextConfig} */
const nextConfig = {
	//output: "standalone", //this is only for next.js on Azure Static Web Apps...
	experimental: {

		//inlineCss: true,
		optimizeCss: true
		//useLightningcss: true,
	},

	// one year in seconds for the stale-while-revalidate cache-control
	expireTime: 31536000,

	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.aglty.io',
			},
		],
	},
	rewrites: async () => {
		return [
			{
				source: '/docs',
				destination: 'https://agilitycms-documentation-site.vercel.app/docs',

			},
			{
				source: '/docs/:slug*',
				destination: 'https://agilitycms-documentation-site.vercel.app/docs/:slug*',
			}
		]
	},
	redirects() {
		return [

			{
				source: '/resources/posts/:path',
				destination: '/blog/:path',
				permanent: true,
			},
			// {
			// 	source: 'https://blog.agilitycms.com/blog/:category/:path',
			// 	destination: '/blog/:path',
			// 	permanent: true,
			// },
			// {
			// 	source: "https://blog.agilitycms.com/:path",
			// 	destination: '/blog/:path',
			// 	permanent: true,
			// },
			{
				source: "/community",
				destination: '/resources/events',
				permanent: true,
			},
			{
				source: "/community/events/:path",
				destination: '/resources/events/:path',
				permanent: true,
			},
			{
				source: "/community/agileliving",
				destination: '/resources/agileliving',
				permanent: true,
			},
			{
				source: "/community/agileliving/:path",
				destination: '/resources/agileliving/:path',
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
