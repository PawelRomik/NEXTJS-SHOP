import ProductShowcaseGallery from "./ProductShowcaseGallery";
import ProductShowcaseDesc from "./ProductShowcaseDesc";
import ProductShowcasePrice from "./ProductShowcasePrice";
import { useTranslations } from "next-intl";

type ProductShowcaseSectionProps = {
	productId: string;
};

export default async function ProductShowcaseSection({ productId }: ProductShowcaseSectionProps) {
	const t = useTranslations("product");
	return (
		<section id="product" className=" relative flex w-full flex-col lg:flex-row  lg:gap-3">
			<h2 className="absolute left-5 top-5 border-b-2 border-r-2 border-red-600 p-2 px-10 text-2xl font-bold text-red-600">
				{t("product")}
			</h2>
			<div className="flex flex-[60%] items-center justify-center bg-black pt-12">
				<ProductShowcaseGallery productId={productId} />
			</div>

			<div className="flex flex-[40%] flex-col justify-between  bg-black px-6 py-6 text-white lg:px-20 lg:py-32">
				<ProductShowcaseDesc productId={productId} />
				<ProductShowcasePrice productId={productId} />
			</div>
		</section>
	);
}
