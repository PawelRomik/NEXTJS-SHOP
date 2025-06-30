import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

async function fetchApolloLinkConfig() {
	const isServer = typeof window === "undefined";
	const apiUrl = isServer ? `http://localhost:3000/api/apollo` : `/api/apollo`;
	const res = await fetch(apiUrl);
	const data = await res.json();
	if (!data.httpLinkUri || !data.apolloAuthKey) {
		throw new Error("Brak wymaganych danych do stworzenia linku Apollo!");
	}
	return data;
}
const createApolloClient = async () => {
	const { httpLinkUri, apolloAuthKey } = await fetchApolloLinkConfig();
	const httpLink = createHttpLink({
		uri: httpLinkUri
	});
	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: `Bearer ${apolloAuthKey}`
			}
		};
	});
	const link = authLink.concat(httpLink);
	return new ApolloClient({
		link: link,
		cache: new InMemoryCache()
	});
};

export default createApolloClient;
