import { gql, ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../apollo-client";
import { cookies } from "next/headers";

type ProductData = {
	id: string;
	attributes: {
		client: {
			data: {
				id: string;
			};
		};
		products: {
			data: {
				id: string;
			}[];
		};
	};
};

type QueryResult = {
	order: {
		data: ProductData;
	};
};

const GET_CART = gql`
	query getOrder($cartId: ID!) {
		order(id: $cartId) {
			data {
				attributes {
					client {
						data {
							id
						}
					}
					products {
						data {
							id
						}
					}
				}
			}
		}
	}
`;

const MODIFY_CART = gql`
	mutation updateOrder($clientId: ID!, $products: [ID]) {
		updateOrder(id: 1, data: { client: $clientId, products: $products }) {
			data {
				id
				attributes {
					client {
						data {
							id
						}
					}
					products {
						data {
							id
						}
					}
				}
			}
		}
	}
`;

type BuyButtonsProps = {
	productIdProp: string;
};

export default function BuyButton({ productIdProp }: BuyButtonsProps) {
	async function addToCart() {
		"use server";
		const currCart = cookies().get("cart")?.value || "1";
		cookies().set("cart", currCart);

		const client = createApolloClient();
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_CART,
			variables: {
				cartId: "1"
			}
		});
		const clientId = data.order.data.attributes.client.data.id;
		const productsId = data.order.data.attributes.products.data;

		const array = [];
		productsId.map((e) => array.push(e.id));
		array.push(productIdProp);

		await client.mutate({
			mutation: MODIFY_CART,
			variables: {
				clientId: clientId,
				products: array
			}
		});
	}

	return (
		<form action={addToCart} className="flex w-[50%] gap-6">
			<button
				className="w-[10rem] rounded-full bg-black p-4 text-white
lg:h-full lg:w-full"
				type="submit"
			>
				BUY
			</button>
		</form>
	);
}
