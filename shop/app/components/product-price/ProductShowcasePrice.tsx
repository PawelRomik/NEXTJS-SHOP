import { getProductPrice } from "../../lib/hooks/getProductData";
import ProductPrice from "./ProductPrice";

type ProductPriceProps = { productId: string };

export default async function ProductShowcasePrice({ productId }: ProductPriceProps) {
	try {
		const price = await getProductPrice(productId);
		if (price === null) return null;
		return <ProductPrice price={price} productId={productId} />;
	} catch {
		return null;
	}
}
