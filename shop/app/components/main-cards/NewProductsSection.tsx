import ProductsSectionIcons from "./ProductsSectionIcons";
import CardBanner from "./CardBanner";
import { useTranslations } from "next-intl";

export default function NewProductsSection() {
	const t = useTranslations("productSection");
	return (
		<div
			style={{ backgroundImage: `url('/bg1.jpeg')` }}
			className="relative mt-3 h-[600px] w-full  bg-cover bg-center bg-no-repeat shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)]"
		>
			<div className="h-full w-full bg-[rgba(0,0,0,0.85)] ">
				<CardBanner title={t("newProductsTitle")} desc={t("newProductsDesc")} />
			</div>
			<div className="absolute top-0 h-full w-full md:right-0 md:w-[100px] ">
				<ProductsSectionIcons />
			</div>
		</div>
	);
}
