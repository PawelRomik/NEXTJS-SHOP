"use client";
import { useTranslations } from "next-intl";
import { formatPrice } from "../lib/utils/formatPrice";
import { useCurrency } from "../context/CurrencyProvider";
import BuyButton from "./BuyButton";

type ProductShowcasePriceProps = {
	price: number;
	productId: string;
};

export default function ProductShowcasePrice({ price, productId }: ProductShowcasePriceProps) {
	const t = useTranslations("product");
	const { exchangeRate } = useCurrency();
	console.log(exchangeRate);

	return (
		<div className="mr-4 flex items-center justify-end lg:justify-center gap-3 lg:flex-col lg:items-start ">
			<p className="text-2xl font-bold text-white">
				{t("price", { amount: formatPrice(price, exchangeRate) })}
			</p>
			<BuyButton productId={productId} />
		</div>
	);
}
