import withNextIntl from "next-intl/plugin";

const nextIntlConfig = withNextIntl();

/** @type {import('next').NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.clerk.com"
			},
			{
				protocol: "http",
				hostname: "**"
			}
		]
	},
	pageExtensions: ["js", "jsx", "ts", "tsx"]
};

export default nextIntlConfig(config);
