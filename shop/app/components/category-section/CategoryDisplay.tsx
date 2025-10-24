import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

type CategoryDisplayProps = {
	direction: boolean;
	category: string;
	imageUrl: string;
	name: string;
	desc: string;
};

export default async function CategoryDisplay({
	direction,
	category,
	imageUrl,
	name,
	desc
}: CategoryDisplayProps) {
	const t = await getTranslations();
	return (
		<div
			className={`flex h-full  items-center justify-center  ${direction ? "flex-row" : "flex-row-reverse"}`}
		>
			<Image
				src={`${process.env.NEXT_PUBLIC_STRAPI_PATH}${imageUrl}`}
				width={300}
				height={300}
				className="img hidden w-full self-center object-contain p-5 lg:flex lg:h-full"
				alt={category}
			></Image>

			<div className="flex-2 flex h-full w-[450px] flex-col items-center justify-around gap-2 text-white lg:items-start lg:gap-0">
				<h2 className="text-2xl font-bold uppercase lg:text-left  lg:text-5xl">{name}</h2>
				<Image
					src={`${process.env.NEXT_PUBLIC_STRAPI_PATH}${imageUrl}`}
					width={300}
					height={300}
					className="img h-[60%] self-center  object-contain lg:hidden"
					alt={category}
				></Image>
				<p className={`w-[80%] text-center text-sm lg:w-auto lg:text-left lg:text-lg`}>{desc}</p>
				<Link
					href={`/category/${category}`}
					className="flex w-full  items-center justify-center lg:justify-start"
				>
					<button className="w-[300px] rounded-lg bg-red-600 p-2 text-xl font-bold text-white hover:bg-red-500 lg:p-4 lg:text-2xl">
						{t("productSection.check")}
					</button>
				</Link>
			</div>
		</div>
	);
}
