"use client";
import Filter from "./filter/Filter";
import { useRouter } from "next/navigation";
import SortOptions from "./filter/SortOptions";
import { useTranslations } from "next-intl";

type ProductFiltersProps = {
	filters: {
		id: string;
		attributes: {
			name: string;
			tags: {
				data: {
					attributes: {
						name: string;
					};
				}[];
			};
		};
	}[];
};
export default function ProductFilters({ filters }: ProductFiltersProps) {
	const t = useTranslations("filters");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const params = new URLSearchParams(window.location.search);
		const selectedTags = formData.getAll("tags").filter((tag) => tag);
		const sort = formData.get("sort");
		params.set("page", "1");

		if (selectedTags.length == 0) {
			params.delete("tags");
		} else {
			params.set("tags", selectedTags.join(","));
		}

		if (sort) {
			params.set("sort", sort.toString());
		} else {
			params.delete("sort");
		}

		router.push(`${window.location.pathname}?${params.toString()}`);
	};

	return (
		<div className="relative z-[20] min-h-[200px] w-full overflow-hidden bg-[rgb(11,11,11)] bg-[size:60%_100%]  bg-center ">
			<h2 className=" flex w-[40%] items-center gap-1 px-5 py-3 text-xl font-bold uppercase text-white">
				<span className="block h-[20px] w-[5px] skew-x-[-25deg] bg-white"></span>
				<span className="mr-2 block h-[20px] w-[5px] skew-x-[-25deg] bg-white"></span>
				{t("filters")}
			</h2>

			<form
				onSubmit={handleSubmit}
				className=" flex w-full flex-col items-start justify-start gap-2"
			>
				<div className="flex w-full grid-cols-5 flex-col flex-wrap items-center justify-center gap-5  p-[3px] px-5  text-white  md:flex-row lg:grid">
					{filters.map((filter) => (
						<Filter key={filter.id} filter={filter} />
					))}

					<SortOptions />
				</div>
				<button
					type="submit"
					className="mx-5 mb-3 h-full rounded-[10px] bg-[rgb(28,28,28)] p-[3px] px-5 font-bold uppercase  text-white  hover:bg-red-600"
				>
					{t("apply")}
				</button>
			</form>
		</div>
	);
}
