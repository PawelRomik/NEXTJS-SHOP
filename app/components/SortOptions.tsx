import { useTranslations } from "next-intl";

export default async function SortOptions() {
	const t = useTranslations("filters");

	return (
		<div className="flex w-full flex-[49%] flex-col flex-wrap bg-black px-10 py-2">
			<h2 className="mb-2 w-full border-b-2 border-zinc-800 text-center">{t("sort")}</h2>
			<select name="sort" className="border-none bg-black p-2 text-center outline-none">
				<option value={"priceLow"}>{t("sortPriceToHigh")}</option>
				<option value={"priceHigh"}>{t("sortPriceToLow")}</option>
				<option value={"latest"} selected>
					{t("sortNewest")}
				</option>
				<option value={"nameStart"}>{t("sortNameToZ")}</option>
				<option value={"nameEnd"}>{t("sortNameToA")}</option>
			</select>
		</div>
	);
}
