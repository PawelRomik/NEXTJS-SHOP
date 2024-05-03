import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../components/ProductDisplay";
import { gql, ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../apollo-client";

interface ProductData {
	id: string;
	attributes: {
		name: string;
		price: number;
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
		categories: {
			data: {
				attributes: {
					name: string;
				};
			}[];
		};
	};
}

interface QueryResult {
	products: {
		data: ProductData[];
	};
}

const GET_PRODUCTS = gql`
	query {
		products {
			data {
				id
				attributes {
					name
					price
					image {
						data {
							attributes {
								url
							}
						}
					}
					categories {
						data {
							attributes {
								name
							}
						}
					}
				}
			}
		}
	}
`;

export default async function HomePage() {
	const client = createApolloClient();
	const { data }: ApolloQueryResult<QueryResult> = await client.query({ query: GET_PRODUCTS });

	return (
		<main className="flex-1 p-6	">
			<Grid gap="4" width="auto" className="grid-cols-1 p-6 lg:grid-cols-4">
				{data.products.data.map((product) => (
					<ProductDisplay
						id={product.id}
						name={product.attributes.name}
						price={product.attributes.price}
						category={""}
						imageUrl={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
						key={product.id}
					></ProductDisplay>
				))}
			</Grid>
		</main>
	);
}
