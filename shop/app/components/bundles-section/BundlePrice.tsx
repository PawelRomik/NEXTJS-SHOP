"use client";
import { SignedIn } from "@clerk/nextjs";
import CartCounter from "../cart/CartCounter";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCurrency } from "../../context/CurrencyProvider";
import { useTranslations } from "next-intl";
import { ProductData } from "../../queries/productType";

type BundlePriceProps = {
	uuid: string;
	price: number;
	products: {
		data: ProductData[];
	};
};

export default function BundlePrice({ uuid, price, products }: BundlePriceProps) {
	const { exchangeRate } = useCurrency();
	const t = useTranslations("product");
	const productPrice = products.data.reduce((sum, product) => sum + product.attributes.price, 0);

	return (
		<div className="my-4 flex w-full flex-col items-center justify-end p-2 pl-6 pt-4">
			<div className="flex w-full items-center justify-center ">
				<p className="flex w-full items-end gap-3 text-2xl font-bold text-white">
					<span className="text-lg text-red-600 line-through">
						{t("price", { amount: formatPrice(productPrice, exchangeRate) })}
					</span>
					<span>{t("price", { amount: formatPrice(price, exchangeRate) })}</span>
				</p>
				<SignedIn>
					<CartCounter productId={uuid}></CartCounter>
				</SignedIn>
			</div>
		</div>
	);
}
