import { getTranslations } from "next-intl/server";
import productImage from "../../public/i1.png";
import Image from "next/image";
import * as motion from "framer-motion/client";
import Link from "next/link";

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
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className="shadow-inset glow-effect relative z-[20]   flex h-[400px] w-full flex-col items-center justify-between overflow-hidden bg-zinc-900 py-3 lg:flex-row lg:gap-5"
		>
			<div className=" ml-[10%] flex h-full w-[500px] flex-col items-start justify-around text-white">
				<h2 className="text-5xl font-bold uppercase">{t(category)}</h2>
				<p className="w-[50%]">
					Explore the latest tech and gaming gear, featuring cutting-edge components and accessories
					designed to elevate your experience. Stay ahead with innovation at your fingertips.
				</p>
				<Link href="/new">
					<button className="w-[300px] rounded-lg bg-red-600 p-4 text-2xl font-bold text-white hover:bg-red-500">
						Check now
					</button>
				</Link>
			</div>
			<Image
				src={productImage}
				className="img absolute left-[50%] flex h-[40%] w-auto translate-x-[-50%] self-center p-5 lg:h-full"
				alt={category}
			></Image>
			<div className=" mr-[10%] flex h-full w-[500px] flex-col items-end justify-around text-right text-white">
				<p></p>
				<p className="w-[50%]">
					Explore the latest tech and gaming gear, featuring cutting-edge components and accessories
					designed to elevate your experience. Stay ahead with innovation at your fingertips.
				</p>
				<Link href="/new">
					<button className="w-[300px] rounded-lg bg-red-600 p-4 text-2xl font-bold text-white hover:bg-red-500">
						Check now
					</button>
				</Link>
			</div>
		</motion.div>
	);
}
