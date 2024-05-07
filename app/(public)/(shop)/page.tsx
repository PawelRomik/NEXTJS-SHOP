import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../components/ProductDisplay";
import { gql, ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../apollo-client";
import { revalidatePath } from "next/cache";

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
		products(pagination: { limit: 100 }, sort: "createdAt:desc") {
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
	revalidatePath("/");
	const client = createApolloClient();
	const { data }: ApolloQueryResult<QueryResult> = await client.query({ query: GET_PRODUCTS });

	return (
		<main className="flex-1 p-6	">
			<h1 className="pl-6 text-4xl font-bold capitalize">All</h1>
			<Grid gap="4" width="auto" className="grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-4 lg:p-6">
				{data.products.data.map((product) => (
					<ProductDisplay
						id={product.id}
						name={product.attributes.name}
						price={product.attributes.price}
						category={product.attributes.categories.data[1].attributes.name}
						imageUrl={`${process.env.PROD_PATH}${product.attributes.image.data.attributes.url}`}
						key={product.id}
					></ProductDisplay>
				))}
			</Grid>
		</main>
	);
}
