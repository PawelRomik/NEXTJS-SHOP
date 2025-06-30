import ProductShowcaseGallery from "./ProductShowcaseGallery";
import ProductShowcaseDesc from "./ProductShowcaseDesc";
import ProductPrice from "./ProductPrice";

type ProductShowcaseSectionProps = {
	productId: string;
	locale: string;
};

export default function ProductShowcaseSection({ productId, locale }: ProductShowcaseSectionProps) {
	return (
		<section
			id="product"
			className="bg3d relative flex w-full flex-col overflow-hidden shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)]  lg:flex-row  lg:gap-3"
		>
			<div className="flex flex-[60%] items-center justify-center pt-12">
				<ProductShowcaseGallery productId={productId} locale={locale} />
			</div>

			<div className="z-[4] flex flex-[40%] flex-col justify-between gap-3 bg-[rgba(0,0,0,0.6)] px-6 py-6 text-white lg:gap-0 lg:px-20 lg:py-32">
				<ProductShowcaseDesc productId={productId} locale={locale} />
				<ProductPrice productId={productId} locale={locale} />
			</div>
		</section>
	);
}
