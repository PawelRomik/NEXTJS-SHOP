import createApolloClient from "../../apollo-client";
import { GET_FILTERS } from "../queries/filters";
import { FiltersData } from "../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import FilterComponent from "./Filter";
import { Suspense } from "react";

export default function ProductFIlters() {
	async function fetchProducts(category: string) {
		const client = createApolloClient();
		try {
			const { data }: ApolloQueryResult<FiltersData> = await client.query({
				query: GET_FILTERS,
				variables: {
					category: category
				}
			});

			if (!data)
				return (
					<p className="col-span-4 row-auto w-full text-center text-3xl font-bold text-zinc-400">
						<i className="ri-error-warning-line"></i> An error occurred while loading products,
						please try again later.
					</p>
				);

			const filters = data.filters.data;
			return (
				<>
					{filters.map((filter) => (
						<FilterComponent key={filter.id} filter={filter} />
					))}
				</>
			);
		} catch {
			return null;
		}
	}

	return (
		<div className="flex w-full flex-col items-start justify-center gap-2  p-6">
			<h2 className="w-[40%] text-xl text-white">Filters</h2>
			<div className=" flex w-full flex-col items-start justify-center gap-2">
				<div className="flex w-[40%] flex-wrap gap-[3px] bg-zinc-800 p-[3px] text-white">
					<Suspense>{fetchProducts("processor")}</Suspense>
					<div className="flex w-full flex-[49%] flex-col flex-wrap bg-black px-10 py-2">
						<h2 className="mb-2 w-full border-b-2 border-zinc-800 text-center">Sort</h2>
						<select className="border-none bg-black p-2 text-center outline-none">
							<option>Price - low to high</option>
							<option>Price - high to low</option>
							<option>Newest</option>
							<option>Name - a to z</option>
							<option>Name - z to a</option>
						</select>
					</div>
				</div>
				<button className="border-[3px] border-zinc-800 bg-black p-2 px-6 text-white hover:border-red-600 hover:bg-red-600">
					Apply
				</button>
			</div>
		</div>
	);
}
