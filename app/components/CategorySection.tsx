import { useTranslations } from "next-intl";
import CategoryDisplay from "./CategoryDisplay";
import CategoryBanner from "./CategoryBanner";
import * as motion from "framer-motion/client";

type ProductOtherSectionProps = {
	category: keyof IntlMessages["categories"];
	locale: string;
};

const list = {
	visible: {},
	hidden: {}
};

export default function CategorySection({ category, locale }: ProductOtherSectionProps) {
	const t = useTranslations("product");

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			variants={list}
			viewport={{ once: true }}
			className="w-full overflow-hidden pt-5"
		>
			<CategoryBanner category={category} />
			<CategoryDisplay locale={locale} category={category} />
		</motion.div>
	);
}
