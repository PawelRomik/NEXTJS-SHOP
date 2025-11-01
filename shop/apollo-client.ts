import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient: ApolloClient<any> | null = null;
let apolloConfigCache: { httpLinkUri: string; apolloAuthKey: string } | null = null;

export async function getApolloClient() {
	if (apolloClient) return apolloClient;
	const httpLinkUri = process.env.NEXT_PUBLIC_STRAPI_PATH + "/graphql";
	const apolloAuthKey = process.env.NEXT_PUBLIC_STRAPI_AUTH_KEY;

	const httpLink = createHttpLink({ uri: httpLinkUri });

	const authLink = setContext((_, { headers }) => ({
		headers: {
			...headers,
			authorization: `Bearer ${apolloAuthKey}`
		}
	}));

	apolloClient = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
		ssrMode: typeof window === "undefined"
	});

	return apolloClient;
}
