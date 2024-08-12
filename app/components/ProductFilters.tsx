"use client";

import createApolloClient from "../../apollo-client";
import { GET_FILTERS } from "../queries/filters";
import { FiltersData } from "../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import FilterComponent from "./Filter";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import SortOptions from "./SortOptions";
import { useTranslation } from "react-i18next";

export default function ProductFIlters({ locale }: { locale: string }) {
	const { t } = useTranslation();
	const router = useRouter();
	async function fetchProducts(category: string) {
		try {
			const client = createApolloClient();
			const { data }: ApolloQueryResult<FiltersData> = await client.query({
				query: GET_FILTERS,
				variables: {
					category: category
				}
			});

			if (!data) return null;

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
		<div className="flex w-full flex-col items-start justify-center gap-2  p-6">
			<h2 className="w-[40%] text-xl text-white">{t("product:filters")}</h2>
			<form
				onSubmit={handleSubmit}
				className=" flex w-full flex-col items-start justify-center gap-2"
			>
				<div className="flex w-[40%] flex-wrap gap-[3px] bg-zinc-800 p-[3px] text-white">
					<Suspense>{fetchProducts("processor")}</Suspense>
					<SortOptions locale={locale} />
				</div>
				<button
					type="submit"
					className="border-[3px] border-zinc-800 bg-black p-2 px-6 text-white hover:border-red-600 hover:bg-red-600"
				>
					{t("product:filtersApply")}
				</button>
			</form>
		</div>
	);
}
