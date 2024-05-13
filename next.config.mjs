/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["localhost", process.env.DOMAIN]
	},
	experimental: {
		typedRoutes: true
	}
};

export default nextConfig;
