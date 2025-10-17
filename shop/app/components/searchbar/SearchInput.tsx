"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchResults from "./SearchResults";
import { useSearchSuggestions } from "../../lib/hooks/useSearchSuggestions";

type SearchInputProps = {
	toggleSearchBar: () => void;
};

export type SearchWords = {
	id: string;
	attributes: {
		name: string;
		slug?: keyof IntlMessages["categories"] | string;
	};
};

export default function SearchInput({ toggleSearchBar }: SearchInputProps) {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [inputValue, setInputValue] = useState("");
	const { searchWords } = useSearchSuggestions(inputValue);

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

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") handleSearch();
	};

	const handleClose = () => {
		setInputValue("");
		toggleSearchBar();
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
						setInputValue(e.target.value);
					}}
					onKeyUp={handleKeyDown}
				></input>
				<button onClick={handleClose} className="h-full bg-zinc-900 p-2 outline-none">
					<i className="ri-close-line pr-1 text-xl"></i>
				</button>
			</div>
			<SearchResults searchWords={searchWords} />
		</>
	);
}
