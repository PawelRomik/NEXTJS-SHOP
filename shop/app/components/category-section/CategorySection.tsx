import CategoryProducts from "./CategoryProducts";
import CategoryBanner from "./CategoryBanner";

type CategorySectionProps = {
	category: keyof IntlMessages["categories"];
	locale: string;
	num: number;
};

export default function CategorySection({ category, locale, num }: CategorySectionProps) {
	return (
		<div className="w-full overflow-hidden">
			<CategoryBanner locale={locale} num={num} category={category} />
			<CategoryProducts locale={locale} category={category} />
		</div>
	);
}
