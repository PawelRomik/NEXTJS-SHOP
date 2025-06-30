async function handler(request: Request) {
	const apolloAuthKey = process.env.NEXT_PUBLIC_STRAPI_AUTH_KEY;
	const httpLinkUri = `${process.env.NEXT_PUBLIC_STRAPI_PATH}/graphql`;
	return new Response(
		JSON.stringify({
			httpLinkUri,
			apolloAuthKey
		}),
		{ status: 200 }
	);
}
export const GET = handler;
export const POST = handler;
export const PUT = handler;
