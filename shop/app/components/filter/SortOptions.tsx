"use client";
import { useTranslations } from "next-intl";

export default function SortOptions() {
	const t = useTranslations("filters");

	return (
		<div className="flex h-full w-[300px] flex-col rounded-2xl bg-[rgb(24,24,24)]  px-10  py-2 lg:w-full">
			<h2 className="mb-2 w-full border-b-4 border-zinc-800 p-2 font-bold  uppercase">
				{t("sort")}
			</h2>
			<select
				name="sort"
				defaultValue={"latest"}
				className="border-none bg-zinc-800 p-2 pr-3 text-center outline-none  focus:bg-zinc-900"
			>
				<option value={"latest"}>{t("sortNewest")}</option>
				<option value={"priceLow"}>{t("sortPriceToHigh")}</option>
				<option value={"priceHigh"}>{t("sortPriceToLow")}</option>
				<option value={"nameStart"}>{t("sortNameToZ")}</option>
				<option value={"nameEnd"}>{t("sortNameToA")}</option>
			</select>
		</div>
	);
}
