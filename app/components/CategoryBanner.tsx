import { getTranslations } from "next-intl/server";
import productImage from "../../public/i1.png";
import Image from "next/image";
import * as motion from "framer-motion/client";

const item = {
	visible: { x: 0 },
	hidden: { x: "-200%" }
};

type ProductOtherSectionProps = {
	category: keyof IntlMessages["categories"];
};

export default async function CategoryBanner({ category }: ProductOtherSectionProps) {
	const t = await getTranslations("categories");

	return (
		<motion.div
			variants={item}
			transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}
			className="shadow-inset flex h-[300px] w-full flex-col items-center justify-center gap-10 bg-red-600 lg:flex-row lg:gap-5"
		>
			<Image src={productImage} className="h-[40%] w-auto lg:h-full" alt={category}></Image>
			<div className="relative bottom-[30px] flex flex-col items-center justify-center">
				<h2 className="text-shadow text-2xl font-bold uppercase text-white lg:text-6xl">
					{t(category)}
				</h2>
				<p className="text-shadow text-xl font-bold uppercase text-white lg:text-4xl">
					Super Ceny!
				</p>
			</div>
		</motion.div>
	);
}
