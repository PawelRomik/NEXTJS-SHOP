"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { CategoriesData, KeywordsData } from "../queries/productType";
import { GET_CATEGORY, GET_KEYWORDS } from "../queries/search";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type searchWordsType = {
	id: string;
	attributes: {
		name: string;
	};
};

export default function SearchBar() {
	const locale = useLocale();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [inputValue, setInputValue] = useState("");
	const [searchInputOpen, setSearchInputOpen] = useState(false);
	const [searchWords, setSearchWords] = useState<searchWordsType[]>();

	const t = useTranslations("search");

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

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	const handleInputChange = (term: string) => {
		setInputValue(term);
	};

	const openSearchBar = () => {
		setSearchInputOpen(true);
	};

	const closeSearchBar = () => {
		setSearchInputOpen(false);
		setInputValue("");
	};

	useEffect(() => {
		const getKeywords = async () => {
			if (inputValue) {
				const client = createApolloClient();
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
						name: inputValue,
						locale: locale
					}
				});

				setSearchWords([...keywords.data.fancywords.data, ...categories.data.categories.data]);
			} else {
				setSearchWords([]);
			}
		};
		getKeywords();
	}, [inputValue, locale]);

	return (
		<div className="flex h-full items-center justify-center overflow-hidden">
			{searchInputOpen && (
				<>
					<div className="absolute right-0 top-0 z-10 flex h-full w-[80vw] origin-right animate-showSearchbar items-center justify-center lg:w-1/4">
						<button onClick={handleSearch} className="h-full  bg-zinc-900 p-2 outline-none">
							<i className="ri-search-line pl-1 text-xl"></i>
						</button>
						<input
							type="text"
							id="search"
							name="search"
							placeholder={t("search")}
							className=" h-full w-full bg-zinc-900  p-2 text-xl outline-none"
							maxLength={100}
							value={inputValue}
							onChange={(e) => {
								handleInputChange(e.target.value);
							}}
							onKeyUp={handleKeyPress}
						></input>
						<button onClick={closeSearchBar} className="h-full bg-zinc-900 p-2 outline-none">
							<i className="ri-close-line pr-1 text-xl"></i>
						</button>
					</div>
					<div className="absolute right-0 top-[100%] w-[100vw] overflow-hidden border-b-[3px] border-red-600 bg-zinc-800 lg:w-1/4 lg:border-l-[3px]">
						{searchWords &&
							searchWords.map((word) => (
								<div key={word.attributes.name} className="p-4 text-zinc-400">
									<Link href={`/search?query=${word.attributes.name}&page=1`}>
										<p className="hover:text-red-600">{word.attributes.name}</p>
									</Link>
								</div>
							))}
					</div>
				</>
			)}

			{!searchInputOpen && (
				<button onClick={openSearchBar} className="text-3xl">
					<i className="ri-search-line"></i>
				</button>
			)}
		</div>
	);
}
