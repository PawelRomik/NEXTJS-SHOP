import ProductShowcaseGallery from "./ProductShowcaseGallery";
import ProductShowcaseDesc from "./ProductShowcaseDesc";
import ProductShowcasePrice from "./ProductShowcasePrice";
import { useTranslations } from "next-intl";

type ProductShowcaseSectionProps = {
	productId: string;
	locale: string;
};

export default function ProductShowcaseSection({ productId, locale }: ProductShowcaseSectionProps) {
	const t = useTranslations("product");
	return (
		<section
			id="product"
			className="bg3d relative flex w-full flex-col overflow-hidden shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)]  lg:flex-row  lg:gap-3"
		>
			<div className="flex flex-[60%] items-center justify-center pt-12">
				<ProductShowcaseGallery productId={productId} />
			</div>

			<div className="z-[4] flex flex-[40%] flex-col justify-between bg-[rgba(0,0,0,0.6)] px-6 py-6 text-white lg:px-20 lg:py-32">
				<ProductShowcaseDesc productId={productId} locale={locale} />
				<ProductShowcasePrice productId={productId} locale={locale} />
			</div>
		</section>
	);
}
