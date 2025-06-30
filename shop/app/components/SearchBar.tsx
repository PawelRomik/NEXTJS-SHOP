"use client";

import { useState } from "react";
import SearchInput from "./SearchInput";

export default function SearchBar() {
	const [searchInputOpen, setSearchInputOpen] = useState(false);

	const openSearchBar = () => {
		setSearchInputOpen(true);
	};

	const closeSearchBar = () => {
		setSearchInputOpen(false);
	};

	return (
		<div className="flex h-full items-center justify-center overflow-hidden">
			{searchInputOpen && <SearchInput closeSearchBar={closeSearchBar} />}

			{!searchInputOpen && (
				<button onClick={openSearchBar} className="text-3xl">
					<i className="ri-search-line"></i>
				</button>
			)}
		</div>
	);
}
