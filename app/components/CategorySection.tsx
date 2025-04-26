import CategoryDisplay from "./CategoryDisplay";
import CategoryBanner from "./CategoryBanner";

type ProductOtherSectionProps = {
	category: keyof IntlMessages["categories"];
	locale: string;
	num: number;
};

export default function CategorySection({ category, locale, num }: ProductOtherSectionProps) {
	return (
		<div className=" w-full overflow-hidden">
			<CategoryBanner locale={locale} num={num} category={category} />
			<CategoryDisplay locale={locale} category={category} />
		</div>
	);
}
