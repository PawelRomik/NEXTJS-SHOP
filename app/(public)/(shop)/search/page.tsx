import { gql, ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../apollo-client";
import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../components/ProductDisplay";

type ProductData = {
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
};

type QueryResult = {
	products: {
		data: ProductData[];
	};
};

const GET_PRODUCTS = gql`
	query getProducts($name: String!) {
		products(
			pagination: { start: 0, limit: 8 }
			sort: "createdAt:desc"
			filters: { name: { contains: $name } }
		) {
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

export default async function SearchPage({
	searchParams
}: {
	searchParams?: {
		query?: string;
	};
}) {
	const query = searchParams?.query || "";
	const client = createApolloClient();

	const { data }: ApolloQueryResult<QueryResult> = await client.query({
		query: GET_PRODUCTS,
		variables: {
			name: query
		}
	});

	console.log(data.products.data);

	return (
		<main className="flex-1 p-6	">
			<h1 className="flex items-center pl-6 text-4xl font-bold">
				<span className="mr-2 rounded-full border-2 border-black px-3 text-2xl">
					{data.products.data.length}
				</span>
				<span>Matches for &quot;{query}&quot;</span>
			</h1>

			<Grid gap="4" width="auto" className="grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-4">
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
