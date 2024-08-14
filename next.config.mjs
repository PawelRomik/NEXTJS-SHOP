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
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
};

export default withMDX(nextConfig);
