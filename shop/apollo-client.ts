import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient: ApolloClient<any> | null = null;
let apolloConfigCache: { httpLinkUri: string; apolloAuthKey: string } | null = null;

async function getApolloConfig() {
	if (apolloConfigCache) return apolloConfigCache;

	const isServer = typeof window === "undefined";
	const apiUrl = isServer ? `https://${process.env.VERCEL_URL}/api/apollo` : "/api/apollo";

	const res = await fetch(apiUrl, { cache: "no-store" });
	if (!res.ok) throw new Error("Błąd podczas pobierania konfiguracji Apollo!");

	const data = await res.json();
	if (!data.httpLinkUri || !data.apolloAuthKey) {
		throw new Error("Brak wymaganych danych do stworzenia linku Apollo!");
	}

	apolloConfigCache = data;
	return data;
}

export async function getApolloClient() {
	if (apolloClient) return apolloClient;

	const { httpLinkUri, apolloAuthKey } = await getApolloConfig();

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
