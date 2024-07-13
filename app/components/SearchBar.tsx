"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [inputValue, setInputValue] = useState("");
	const [searchInputOpen, setSearchInputOpen] = useState(false);

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

	return (
		<div className="flex h-full items-center justify-center">
			{searchInputOpen && (
				<div className="absolute right-0 top-0 z-10 flex h-full w-[80vw] origin-right animate-showSearchbar items-center justify-center lg:w-1/4">
					<button onClick={handleSearch} className="h-full  bg-zinc-900 p-2 outline-none">
						<i className="ri-search-line pl-1 text-xl"></i>
					</button>
					<input
						type="text"
						id="search"
						name="search"
						placeholder="Search"
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
			)}

			{!searchInputOpen && (
				<button onClick={openSearchBar} className="text-3xl">
					<i className="ri-search-line"></i>
				</button>
			)}
		</div>
	);
}
