"use client";

import { useCallback, useState } from "react";
import SearchInput from "./SearchInput";

export default function SearchBar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSearchBar = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	return (
		<div className="flex h-full items-center justify-center overflow-hidden">
			{isOpen && <SearchInput toggleSearchBar={toggleSearchBar} />}

			{!isOpen && (
				<button onClick={toggleSearchBar} aria-label="Open search bar" className="text-3xl">
					<i className="ri-search-line"></i>
				</button>
			)}
		</div>
	);
}
