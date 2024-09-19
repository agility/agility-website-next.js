/** @type {import('next').NextConfig} */
const nextConfig = {
	//output: "standalone", //this is only for next.js on Azure Static Web Apps...

	// one year in seconds for the stale-while-revalidate cache-control
	swrDelta: 31536000,
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
}

module.exports = nextConfig
