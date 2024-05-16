"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [inputValue, setInputValue] = useState("");
	const [inputVisibility, setInputVisibility] = useState(false);

	const handleSearch = () => {
		setInputVisibility(false);
		const params = new URLSearchParams(searchParams);
		if (inputValue) {
			params.set("query", inputValue);
			router.push(`/search?${params.toString()}`);
		} else {
			params.delete("query");
			router.push("/");
		}
	};

	const handleInputChange = (term: string) => {
		setInputValue(term);
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	const handleVisiblityButtonPress = () => {
		if (inputVisibility) {
			setInputVisibility(false);
			setInputValue("");
		} else {
			setInputVisibility(true);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="flex items-center justify-center gap-2 lg:gap-6">
				<div className="relative flex items-center justify-center">
					<input
						type="text"
						id="search"
						name="search"
						placeholder="Search"
						className="hidden h-full w-10  border-2 border-r-0 border-black p-2 outline-none lg:block lg:w-40"
						value={inputValue}
						onChange={(e) => {
							handleInputChange(e.target.value);
						}}
						onKeyDown={handleKeyPress}
					></input>
					<button
						onClick={handleSearch}
						className="hidden pr-1 text-2xl lg:flex lg:h-full lg:border-2 lg:border-l-0 lg:border-black lg:text-3xl"
					>
						<i className="ri-search-line"></i>
					</button>

					{/*Mobile*/}
					<button
						onClick={handleVisiblityButtonPress}
						className="flex pr-1 text-2xl lg:hidden lg:h-full lg:border-2 lg:border-l-0 lg:border-black lg:text-3xl"
					>
						{inputVisibility ? (
							<i className="ri-close-circle-line"></i>
						) : (
							<i className="ri-search-line"></i>
						)}
					</button>
					{inputVisibility && (
						<div className="fixed left-[50%] top-[5rem] flex h-[2.5rem] w-[70vw] translate-x-[-50%] items-center  justify-center lg:hidden">
							<input
								type="text"
								id="search"
								name="search"
								placeholder="Search"
								className="h-full w-full border-2 border-r-0 border-black p-2 outline-none lg:hidden"
								value={inputValue}
								onChange={(e) => {
									handleInputChange(e.target.value);
								}}
								onKeyDown={handleKeyPress}
							></input>
							<button
								onClick={handleSearch}
								className="flex h-full items-center justify-center border-2 border-l-0 border-black bg-white p-2 outline-none lg:hidden"
							>
								<i className="ri-arrow-left-line"></i>
							</button>
						</div>
					)}
				</div>

			</div>
		</div>
	);
}
