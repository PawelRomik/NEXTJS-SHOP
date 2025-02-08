import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: `${process.env.NEXT_PUBLIC_PROD_PATH}/graphql`
});

const authLink = setContext((_, { headers }) => {
	const token = process.env.APOLLO_AUTH_KEY;
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ""
		}
	};
});

const createApolloClient = () => {
	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache()
	});
};

export default createApolloClient;
