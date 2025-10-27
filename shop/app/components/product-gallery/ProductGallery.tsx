import { getProductImages } from "../../lib/hooks/getProductData";
import ProductImages from "./ProductImages";

type ProductShowcaseGalleryServerProps = {
	productId: string;
	locale: string;
};

export default async function ProductGallery({
	productId,
	locale
}: ProductShowcaseGalleryServerProps) {
	const productImages = await getProductImages(productId, locale);
	return <ProductImages images={productImages} />;
}
