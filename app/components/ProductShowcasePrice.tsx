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
		<div className="mr-4 flex flex-col items-end justify-center gap-3 lg:items-start">
			<p className="text-3xl font-bold text-white">
				{t("price", { amount: formatPrice(price, exchangeRate) })}
			</p>
			<BuyButton productId={productId} />
		</div>
	);
}
