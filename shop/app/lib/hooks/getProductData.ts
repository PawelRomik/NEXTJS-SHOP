import { getApolloClient } from "../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_PRODUCT_DESC, GET_PRODUCT_IMAGES, GET_PRODUCT_PRICE } from "../../queries/productPage";
import { QueryResult } from "../../queries/productType";

export async function getProductPrice(productId: string) {
	const client = await getApolloClient();

	const { data }: ApolloQueryResult<QueryResult> = await client.query({
		query: GET_PRODUCT_PRICE,
		variables: { productId }
	});

	const price = data.products.data[0]?.attributes?.price ?? null;
	return price;
}

export async function getProductImages(productId: string, locale: string) {
	const client = await getApolloClient();
	const { data }: ApolloQueryResult<QueryResult> = await client.query({
		query: GET_PRODUCT_IMAGES,
		variables: { productId, locale }
	});

	return data.products.data[0].attributes.images.data;
}

export async function getProductDesc(productId: string, locale: string) {
	const client = await getApolloClient();
	const { data }: ApolloQueryResult<QueryResult> = await client.query({
		query: GET_PRODUCT_DESC,
		variables: { productId, locale }
	});

	const currProduct = data.products.data[0].attributes;
	const category = currProduct.categories.data[0].attributes.slug;

	return {
		name: currProduct.name,
		desc: currProduct.desc,
		category
	};
}
