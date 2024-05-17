import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../../../components/ProductDisplay";
import { gql, ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../../apollo-client";
import { revalidatePath } from "next/cache";

type ProductData = {
	id: string;
	attributes: {
		name: string;
		price: number;
		salePrice: number;
		onSale: boolean;
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

const GET_NEW_PRODUCTS = gql`
	query {
		products(pagination: { start: 0, limit: 8 }, sort: "createdAt:desc") {
			data {
				id
				attributes {
					name
					price
					onSale
					salePrice
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

const GET_SALE_PRODUCTS = gql`
	query {
		products(pagination: { start: 0, limit: 100 }, filters: { onSale: { eq: true } }) {
			data {
				id
				attributes {
					name
					price
					onSale
					salePrice
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

const GET_PRODUCTS = gql`
	query getProducts($category: String!, $sex: String!) {
		products(
			pagination: { start: 0, limit: 100 }
			sort: "createdAt:desc"
			filters: { categories: { slug: { eq: $category } }, sexes: { sex: { eq: $sex } } }
		) {
			data {
				id
				attributes {
					name
					price
					onSale
					salePrice
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

export default async function ShopPage({ params }: { params: { category: string; sex?: string } }) {
	revalidatePath("/shop/[category]/[[...sex]]", "page");
	const category = params.category;
	const sex = params.sex && params.sex[0] ? params.sex[0] : "";
	const client = createApolloClient();
	let query;
	switch (params.category) {
		case "new":
			query = GET_NEW_PRODUCTS;
			break;
		case "sale":
			query = GET_SALE_PRODUCTS;
			break;
		default:
			query = GET_PRODUCTS;
	}
	const { data }: ApolloQueryResult<QueryResult> = await client.query({
		query: query,
		variables: {
			category: category,
			sex: sex
		}
	});

	return (
		<main className="flex-1 p-6	">
			<h1 className="pl-6 text-4xl font-bold capitalize">
				{sex && (
					<>
						<span>{sex}</span>
						<i className="ri-circle-fill mx-2 align-middle text-[1rem]"></i>
					</>
				)}
				<span>{category}</span>
			</h1>
			<Grid gap="4" width="auto" className="grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-4">
				{data.products.data.map((product) => (
					<ProductDisplay
						id={product.id}
						name={product.attributes.name}
						onSale={product.attributes.onSale}
						salePrice={product.attributes.salePrice}
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
