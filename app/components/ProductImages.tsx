"use client";
import { useEffect } from "react";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../apollo-client";
import { QueryResultSingle } from "../queries/productType";
import { GET_PRODUCT_IMAGES } from "../queries/productPage";

type ProductImagesProps = {
	productId: string;
	onImagesLoaded: (images: any[], mainImageSrc: string) => void;
};

function ProductImages({ productId, onImagesLoaded }: ProductImagesProps) {
	useEffect(() => {
		async function fetchProductImages() {
			try {
				const client = createApolloClient();
				const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
					query: GET_PRODUCT_IMAGES,
					variables: { productId }
				});

				const currProduct = data.product.data.attributes;
				onImagesLoaded(currProduct.images.data, currProduct.images.data[0].attributes.url);
			} catch (error) {
				console.error("Error fetching product images:", error);
			}
		}

		fetchProductImages();
	}, [productId, onImagesLoaded]);

	return null;
}

export default ProductImages;
