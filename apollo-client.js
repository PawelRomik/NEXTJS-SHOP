import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: `${process.env.PROD_PATH}/graphql`,
});

console.log(`${process.env.PROD_PATH}/graphql`);
const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: `Bearer ${process.env.APOLLO_AUTH_KEY}`,
		},
	};
});

const createApolloClient = () => {
	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
};

export default createApolloClient;
