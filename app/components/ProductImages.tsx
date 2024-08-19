"use client";

import { useEffect } from "react";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../apollo-client";
import { QueryResult } from "../queries/productType";
import { GET_PRODUCT_IMAGES } from "../queries/productPage";
import { useLocale } from "next-intl";

type ProductImagesProps = {
	productId: string;
	onImagesLoaded: (images: any[], mainImageSrc: string) => void;
};

function ProductImages({ productId, onImagesLoaded }: ProductImagesProps) {
	const locale = useLocale();
	useEffect(() => {
		async function fetchProductImages() {
			try {
				const client = createApolloClient();
				const { data }: ApolloQueryResult<QueryResult> = await client.query({
					query: GET_PRODUCT_IMAGES,
					variables: { productId, locale }
				});

				const currProduct = data.products.data[0].attributes;
				onImagesLoaded(currProduct.images.data, currProduct.images.data[0].attributes.url);
			} catch (error) {
				console.error("Error fetching product images:", error);
			}
		}

		fetchProductImages();
	}, [productId, onImagesLoaded, locale]);

	return null;
}

export default ProductImages;
