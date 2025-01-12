import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ProductsSectionIcons from "./ProductsSectionIcons";

type Category = {
	title: string;
	desc: string;
	alignment: string;
};

export default async function NewProductsSection({ type }: { type: number }) {
	const t = await getTranslations("productSection");

	const categories: Record<number, Category> = {
		1: {
			title: t("newProductsTitle"),
			desc: t("newProductsDesc"),
			alignment: "lg:ml-[10%] lg:items-start"
		},
		2: {
			title: t("saleTitle"),
			desc: t("saleDesc"),
			alignment: "lg:items-center"
		},
		3: {
			title: t("bundlesTitle"),
			desc: t("bundlesDesc"),
			alignment: "lg:mr-[10%] lg:items-end"
		}
	};

	const { title, desc, alignment } = categories[type] || categories[1];

	return (
		<div
			style={{ backgroundImage: `url('/bg${type}.jpeg')` }}
			className="relative mt-3 h-[600px] w-full  bg-cover bg-center bg-no-repeat shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)]"
		>
			<div className="h-full w-full bg-[rgba(0,0,0,0.85)]">
				<div
					className={`flex h-full flex-col items-center justify-center gap-3 text-2xl text-white ${alignment}`}
				>
					<h2 className="text-shadow-lg text-4xl font-bold lg:text-5xl">{title}</h2>
					<h4 className="text-shadow-lg w-[300px] py-3 text-center text-lg text-zinc-200 lg:w-[500px] lg:text-left lg:text-xl">
						{desc}
					</h4>
					<Link href="/new">
						<button className="w-[200px] rounded-lg bg-red-600 p-3 font-bold text-white hover:bg-red-500">
							{t("check")}
						</button>
					</Link>
				</div>
			</div>
			{type == 1 && (
				<div className="absolute right-0 top-0 h-full w-[100px] ">
					<ProductsSectionIcons />
				</div>
			)}
		</div>
	);
}
