import { getTranslations } from "next-intl/server";
import { getProductDesc } from "../../lib/hooks/getProductData";

type ProductShowcaseDescProps = {
	productId: string;
	locale: string;
};

export default async function ProductShowcaseDesc({ productId, locale }: ProductShowcaseDescProps) {
	const { name, desc, category } = await getProductDesc(productId, locale);
	const t = await getTranslations("categories");

	const extractText = (text: string) => {
		const startIndex = text.indexOf("--START--") + "--START--".length;
		const endIndex = text.indexOf(".");
		return text.slice(startIndex, endIndex).trim() + ".";
	};

	return (
		<div className="flex w-full flex-col gap-5">
			<div className="flex w-full flex-col items-center lg:items-end">
				<h1 className="py-3 text-2xl font-bold lg:text-4xl">{name}</h1>
				<div className="w-full border-[5px] border-transparent border-t-red-600" />
				<div className="w-[90%] border-[3px] border-transparent border-t-red-700" />
				<h2 className="uppercase text-red-600">{t(category)}</h2>
			</div>
			<p className="mt-auto text-center lg:text-left">{extractText(desc)}</p>
		</div>
	);
}
