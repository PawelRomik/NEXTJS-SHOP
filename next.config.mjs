import * as NextMdx from "@next/mdx";

const withMDX = NextMdx.default({
	extension: /\.mdx?$/
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["localhost", process.env.NEXT_PUBLIC_DOMAIN, "img.clerk.com"]
	},
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	experimental: {
		typedRoutes: true
	}
};

export default withMDX(nextConfig);
