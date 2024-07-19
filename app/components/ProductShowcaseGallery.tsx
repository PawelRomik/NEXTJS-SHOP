import { GET_PRODUCT_IMAGES } from "../queries/productPage";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResultSingle } from "../queries/productType";
import Image from "next/image";
import { Suspense } from "react";
import createApolloClient from "../../apollo-client";

type ProductShowcaseGalleryProps = {
	productId: string;
};

export default function ProductShowcaseGallery({ productId }: ProductShowcaseGalleryProps) {
	const client = createApolloClient();
	async function getProductImages() {
		const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
			query: GET_PRODUCT_IMAGES,
			variables: {
				productId: productId
			}
		});

		const currProduct = data.product.data.attributes;
		return (
			<Image
				width={600}
				height={600}
				src={`${process.env.NEXT_PUBLIC_PROD_PATH}${currProduct.images.data[0].attributes.url}`}
				alt={currProduct.name}
				className="h-[100%] object-contain p-6"
			/>
		);
	}

	return <Suspense>{getProductImages()}</Suspense>;
}
