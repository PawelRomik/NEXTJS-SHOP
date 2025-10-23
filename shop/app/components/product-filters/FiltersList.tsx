"use client";
import FilterBox from "../filter/FilterBox";
import SortOptions from "../filter/SortOptions";

type FiltersListProps = {
	filters: {
		id: string;
		attributes: {
			name: string;
			tags: {
				data: {
					attributes: { name: string };
				}[];
			};
		};
	}[];
};

export default function FiltersList({ filters }: FiltersListProps) {
	return (
		<div className="flex w-full flex-col flex-wrap items-center justify-center gap-5 p-[3px] px-5 text-white md:flex-row lg:grid lg:grid-cols-5">
			{filters.map((filter) => (
				<FilterBox key={filter.id} filter={filter} />
			))}
			<SortOptions />
		</div>
	);
}
