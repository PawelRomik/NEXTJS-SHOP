import { GET_PRODUCT_PRICE } from "../queries/productPage";
import { getApolloClient } from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../queries/productType";
import ProductShowcasePrice from "./ProductShowcasePrice";

type ProductPriceProps = {
	productId: string;
	locale: string;
};

export default async function ProductPrice({ productId, locale }: ProductPriceProps) {
	try {
		const client = await getApolloClient();
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_PRODUCT_PRICE,
			variables: {
				productId: productId
			}
		});

		const currProduct = data.products.data[0].attributes;
		return <ProductShowcasePrice price={currProduct.price} productId={productId} />;
	} catch (err) {
		return null;
	}
}
