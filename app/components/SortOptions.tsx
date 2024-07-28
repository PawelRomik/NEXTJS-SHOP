export default function SortOptions() {
	return (
		<div className="flex w-full flex-[49%] flex-col flex-wrap bg-black px-10 py-2">
			<h2 className="mb-2 w-full border-b-2 border-zinc-800 text-center">Sort</h2>
			<select name="sort" className="border-none bg-black p-2 text-center outline-none">
				<option value={"priceLow"}>Price: Low to High</option>
				<option value={"priceHigh"}>Price: High to Low</option>
				<option value={"latest"} selected>
					Newest
				</option>
				<option value={"nameStart"}>Name: A to Z</option>
				<option value={"nameEnd"}>Name: Z to A</option>
			</select>
		</div>
	);
}
