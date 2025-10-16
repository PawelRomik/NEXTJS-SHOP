import { useState } from "react";
import { GET_CATEGORY_IMAGE } from "../../queries/category";
import { getApolloClient } from "../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { CategoryData } from "../../queries/productType";

export function useCategoryImage() {
	const [imageSrc, setImageSrc] = useState<string>("");
	const [cache, setCache] = useState<Record<string, string>>({});

	const changeImageSrc = async (slug: string) => {
		if (cache[slug]) {
			setImageSrc(cache[slug]);
			return;
		}

		try {
			const client = await getApolloClient();
			const { data }: ApolloQueryResult<CategoryData> = await client.query({
				query: GET_CATEGORY_IMAGE,
				variables: { slug }
			});
			const url = data.categories.data[0]?.attributes.image.data.attributes.url;
			if (url) {
				const fullUrl = `${process.env.NEXT_PUBLIC_STRAPI_PATH}${url}`;
				setCache((prev) => ({ ...prev, [slug]: fullUrl }));
				setImageSrc(fullUrl);
			} else {
				setImageSrc("");
			}
		} catch {
			setImageSrc("");
		}
	};

	return { imageSrc, changeImageSrc, resetImage: () => setImageSrc("") };
}
