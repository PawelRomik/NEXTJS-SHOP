/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["localhost", process.env.NEXT_PUBLIC_DOMAIN, "img.clerk.com"]
	},
	experimental: {
		typedRoutes: true
	}
};

export default nextConfig;
