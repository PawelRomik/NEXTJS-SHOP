import { GET_PRODUCT_PRICE } from "../queries/productPage";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResultSingle } from "../queries/productType";
import { Suspense } from "react";
import createApolloClient from "../../apollo-client";
import BuyButton from "./BuyButton";

type ProductShowcasePriceProps = {
	productId: string;
};

export default function ProductShowcasePrice({ productId }: ProductShowcasePriceProps) {
	async function getProductPrice() {
		try {
			const client = createApolloClient();
			const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
				query: GET_PRODUCT_PRICE,
				variables: {
					productId: productId
				}
			});

			const currProduct = data.product.data.attributes;
			return (
				<div className="mr-4 flex flex-col items-end justify-center gap-3 lg:items-start">
					<p className="text-3xl font-bold">PLN {currProduct.price}</p>
					<BuyButton productId={productId} />
				</div>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getProductPrice()}</Suspense>;
}
