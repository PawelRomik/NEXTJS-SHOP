"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HamburgerSearch() {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [inputValue, setInputValue] = useState("");

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

	return (
		<div className=" z-10 flex h-full w-[80vw] origin-right items-center justify-center py-2">
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
			<button onClick={handleSearch} className="h-full  bg-zinc-900 p-2 outline-none">
				<i className="ri-search-line pl-1 text-xl"></i>
			</button>
		</div>
	);
}
