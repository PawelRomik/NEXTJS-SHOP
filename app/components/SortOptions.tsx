import initTranslations from "../i18n";

export default async function SortOptions({ locale }: { locale: string }) {
	const { t } = await initTranslations(locale, ["shop"]);

	return (
		<div className="flex w-full flex-[49%] flex-col flex-wrap bg-black px-10 py-2">
			<h2 className="mb-2 w-full border-b-2 border-zinc-800 text-center">Sort</h2>
			<select name="sort" className="border-none bg-black p-2 text-center outline-none">
				<option value={"priceLow"}>{t("shop:sortPriceToHigh")}</option>
				<option value={"priceHigh"}>{t("shop:sortPriceToLow")}</option>
				<option value={"latest"} selected>
					{t("shop:sortNewest")}
				</option>
				<option value={"nameStart"}>{t("shop:sortNameToZ")}</option>
				<option value={"nameEnd"}>{t("shop:sortNameToA")}</option>
			</select>
		</div>
	);
}
