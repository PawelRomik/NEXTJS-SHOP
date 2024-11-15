async function handler(request: Request) {
	const apolloAuthKey = process.env.APOLLO_AUTH_KEY;

	const httpLinkUri = `${process.env.NEXT_PUBLIC_PROD_PATH}/graphql`;

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
