import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../queries/productType";
import { GET_PRODUCT_IMAGES } from "../queries/productPage";
import { getApolloClient } from "../../apollo-client";
import ProductImages from "./ProductImages";

type ProductShowcaseGalleryServerProps = {
	productId: string;
	locale: string;
};

export default async function ProductShowcaseGalleryServer({
	productId,
	locale
}: ProductShowcaseGalleryServerProps) {
	const client = await getApolloClient();
	const { data }: ApolloQueryResult<QueryResult> = await client.query({
		query: GET_PRODUCT_IMAGES,
		variables: { productId, locale }
	});

	const productImages = data.products.data[0].attributes.images.data;

	return <ProductImages images={productImages} />;
}
