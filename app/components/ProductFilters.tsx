"use client";
import Filter from "./Filter";
import { useRouter } from "next/navigation";
import SortOptions from "./SortOptions";
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
		<div className="relative z-[20] w-full overflow-hidden bg-[rgb(15,15,20)] bg-[size:60%_100%]  bg-center ">
			<h2 className="w-[40%] text-xl text-white">{t("filters")}</h2>
			<form
				onSubmit={handleSubmit}
				className=" flex w-full flex-col items-start justify-center gap-2"
			>
				<div className="flex w-[40%] flex-wrap gap-[3px]  p-[3px] text-white">
					{filters.map((filter) => (
						<Filter key={filter.id} filter={filter} />
					))}
					<SortOptions />
				</div>
				<button
					type="submit"
					className="border-[3px] border-zinc-800 p-2 px-6 text-white hover:border-red-600 hover:bg-red-600"
				>
					{t("apply")}
				</button>
			</form>
		</div>
	);
}
