import { GET_CATEGORY_ALLDATA } from "../../queries/category";
import { getApolloClient } from "../../../apollo-client";
import { CategoryData } from "../../queries/productType";
import { ApolloQueryResult } from "@apollo/client";

export async function useCategoryData(category: string, locale: string) {
	const client = await getApolloClient();

	const { data }: ApolloQueryResult<CategoryData> = await client.query({
		query: GET_CATEGORY_ALLDATA,
		variables: { slug: category, locale }
	});

	const categoryData = data.categories.data[0]?.attributes;
	if (!categoryData) return null;

	return categoryData;
}
