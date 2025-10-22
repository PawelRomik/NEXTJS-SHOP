import { useEffect, useState } from "react";
import { ApolloQueryResult } from "@apollo/client";
import { getApolloClient } from "../../../apollo-client";
import { GET_CATEGORY, GET_KEYWORDS } from "../../queries/search";
import { CategoriesData, KeywordsData } from "../../queries/productType";
import { useTranslations, useLocale } from "next-intl";

export type SearchWord = {
	id: string;
	attributes: {
		name: string;
		slug?: string;
	};
};

export function useSearchSuggestions(inputValue: string) {
	const [searchWords, setSearchWords] = useState<SearchWord[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const locale = useLocale();
	const t = useTranslations();

	useEffect(() => {
		if (!inputValue.trim()) {
			setSearchWords([]);
			return;
		}

		const timeout = setTimeout(async () => {
			setIsLoading(true);
			setError(null);

			try {
				const client = await getApolloClient();

				const [keywords, categories]: [
					ApolloQueryResult<KeywordsData>,
					ApolloQueryResult<CategoriesData>
				] = await Promise.all([
					client.query({
						query: GET_KEYWORDS,
						variables: { name: inputValue, locale }
					}),
					client.query({
						query: GET_CATEGORY,
						variables: { name: inputValue }
					})
				]);

				const translated = [
					...keywords.data.fancywords.data.map((k) => ({
						id: k.id,
						attributes: { name: k.attributes.name, slug: k.attributes.name }
					})),
					...categories.data.categories.data.map((c) => ({
						id: c.id,
						attributes: {
							name: t(`categories.${c.attributes.slug}`),
							slug: c.attributes.slug
						}
					}))
				];

				setSearchWords(translated);
			} catch (err) {
				console.error("Error fetching search suggestions:", err);
				setError("Failed to fetch search suggestions");
			} finally {
				setIsLoading(false);
			}
		}, 400);

		return () => clearTimeout(timeout);
	}, [inputValue, locale, t]);

	return { searchWords, isLoading, error };
}
