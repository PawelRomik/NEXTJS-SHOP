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
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			variants={list}
			viewport={{ once: true }}
			className="my-5 w-full overflow-hidden"
		>
			<CategoryBanner category={category} />
			<CategoryDisplay locale={locale} category={category} />
		</motion.div>
	);
}
