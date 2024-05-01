"use client";
export default function SearchBar() {
	return (
		<div className="flex items-center justify-center">
			<div className="flex items-center justify-center gap-2 lg:gap-6">
				<div className="flex items-center justify-center">
					<input
						type="text"
						id="search"
						name="search"
						placeholder="Search"
						className="hidden h-full w-10 border-2 border-r-0 border-black p-2 outline-none lg:block lg:w-40"
					></input>
					<i className="ri-search-line pr-1 text-2xl lg:h-full lg:border-2 lg:border-l-0 lg:border-black lg:text-3xl"></i>
				</div>

				<i className="ri-account-circle-line text-2xl lg:text-3xl"></i>
			</div>
		</div>
	);
}
