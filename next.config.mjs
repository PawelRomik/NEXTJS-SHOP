import * as NextMdx from "@next/mdx";
import i18nConfig from "./i18nConfig.js";

const withMDX = NextMdx.default({
	extension: /\.mdx?$/
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "**"
			}
		]
	},
	async redirects() {
		return [
			{
				source: "/shop",
				destination: "/",
				permanent: true
			},
			{
				source: "/order",
				destination: "/",
				permanent: true
			},
			{
				source: "/shop/:slug",
				destination: "/shop/:slug/all/1",
				permanent: true
			},
			{
				source: "/shop/:slug/:sex",
				destination: "/shop/:slug/:sex/1",
				permanent: true
			}
		];
	},
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
};

export default withMDX(nextConfig);
