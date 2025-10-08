"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_CATEGORY, GET_KEYWORDS } from "../../queries/search";
import { CategoriesData, KeywordsData } from "../../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import { getApolloClient } from "../../../apollo-client";
import Link from "next/link";

type SearchInputProps = {
	closeSearchBar?: () => void;
};

type searchWordsType = {
	id: string;
	attributes: {
		name: string;
		slug?: keyof IntlMessages["categories"] | string;
	};
};

export default function SearchInput({ closeSearchBar }: SearchInputProps) {
	const t = useTranslations();
	const locale = useLocale();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [inputValue, setInputValue] = useState("");
	const [searchWords, setSearchWords] = useState<searchWordsType[]>();

	const handleSearch = () => {
		const params = new URLSearchParams(searchParams);
		if (inputValue) {
			params.set("query", inputValue);
			params.set("page", "1");
			router.push(`/search?${params.toString()}`);
		} else {
			params.delete("query");
			router.push("/");
		}
	};

	useEffect(() => {
		const getKeywords = async () => {
			if (inputValue) {
				const client = await getApolloClient();
				const keywords: ApolloQueryResult<KeywordsData> = await client.query({
					query: GET_KEYWORDS,
					variables: {
						name: inputValue,
						locale: locale
					}
				});
				const categories: ApolloQueryResult<CategoriesData> = await client.query({
					query: GET_CATEGORY,
					variables: {
						name: inputValue
					}
				});

				const translatedKeywords = keywords.data.fancywords.data.map((keyword) => {
					return {
						...keyword,
						attributes: {
							name: keyword.attributes.name,
							slug: keyword.attributes.name
						}
					};
				});

				const translatedCategories = categories.data.categories.data.map((category) => {
					return {
						...category,
						attributes: {
							name: t(`categories.${category.attributes.slug}`),
							slug: category.attributes.slug
						}
					};
				});

				setSearchWords([...translatedKeywords, ...translatedCategories]);
			} else {
				setSearchWords([]);
			}
		};
		getKeywords();
	}, [inputValue, locale, t]);

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	const handleInputChange = (term: string) => {
		setInputValue(term);
	};

	const handleClose = () => {
		setInputValue("");
		if (closeSearchBar) closeSearchBar();
	};

	return (
		<>
			<div className="absolute right-0 top-0 z-10 flex h-full w-[80vw] origin-right animate-showSearchbar items-center justify-center lg:w-1/4">
				<button onClick={handleSearch} className="h-full  bg-zinc-900 p-2 outline-none">
					<i className="ri-search-line pl-1 text-xl"></i>
				</button>
				<input
					type="text"
					id="search"
					name="search"
					placeholder={t("search.search")}
					className=" h-full w-full bg-zinc-900  p-2 text-xl outline-none"
					maxLength={100}
					value={inputValue}
					onChange={(e) => {
						handleInputChange(e.target.value);
					}}
					onKeyUp={handleKeyPress}
				></input>
				{closeSearchBar && (
					<button onClick={handleClose} className="h-full bg-zinc-900 p-2 outline-none">
						<i className="ri-close-line pr-1 text-xl"></i>
					</button>
				)}
			</div>
			<div className="absolute right-0 top-[100%] w-[100vw] overflow-hidden border-b-[3px] border-red-600 bg-zinc-800 lg:w-1/4 lg:border-l-[3px]">
				{searchWords &&
					searchWords.map((word) => (
						<div key={word.attributes.slug} className="p-4 text-zinc-400">
							<Link href={`/search?query=${word.attributes.slug}&page=1`}>
								<p className="hover:text-red-600">{word.attributes.name}</p>
							</Link>
						</div>
					))}
			</div>
		</>
	);
}
