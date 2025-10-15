"use client";
import { useTranslations } from "next-intl";

export default function SortOptions() {
	const t = useTranslations("filters");

	const options = [
		{ value: "latest", label: t("sortNewest") },
		{ value: "priceLow", label: t("sortPriceToHigh") },
		{ value: "priceHigh", label: t("sortPriceToLow") },
		{ value: "nameStart", label: t("sortNameToZ") },
		{ value: "nameEnd", label: t("sortNameToA") }
	];

	return (
		<div className="flex h-full w-[300px] flex-col rounded-2xl bg-[rgb(24,24,24)]  px-10  py-2 lg:w-full">
			<label
				htmlFor="sort"
				className="mb-2 w-full border-b-4 border-zinc-800 p-2 font-bold  uppercase"
			>
				{t("sort")}
			</label>
			<select
				name="sort"
				defaultValue={"latest"}
				className="border-none bg-zinc-800 p-2 pr-3 text-center outline-none  focus:bg-zinc-900"
			>
				{options.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>
		</div>
	);
}
