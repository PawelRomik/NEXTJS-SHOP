import { getTranslations } from "next-intl/server";
import { useCategoryData } from "../../lib/hooks/useCategoryData";
import CategoryHeader from "./CategoryHeader";
import CategoryDescription from "./CategoryDescription";
import CategoryButton from "./CategoryButton";
import CategoryImages from "./CategoryImages";

export default async function CategoryShowcase({
	category,
	locale
}: {
	category: keyof IntlMessages["categories"];
	locale: string;
}) {
	const t = await getTranslations();
	const categoryData = await useCategoryData(category, locale);

	if (!categoryData) return null;

	const { name, desc, showcase } = categoryData;

	return (
		<div className="bg3d relative flex h-[500px] w-full flex-col items-center justify-around gap-4 overflow-hidden bg-cover bg-center bg-no-repeat shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)] md:grid md:grid-cols-[2fr_6fr]">
			<div className="z-[4] flex flex-col justify-center gap-2 px-5 text-white">
				<CategoryHeader name={name} />
				<CategoryDescription desc={desc} />
				<CategoryButton label={t("productSection.check")} href="/new" />
			</div>

			<CategoryImages showcase={showcase} />
		</div>
	);
}
