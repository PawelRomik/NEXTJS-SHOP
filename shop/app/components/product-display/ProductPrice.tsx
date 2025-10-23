"use client";
import { useTranslations } from "next-intl";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCurrency } from "../../lib/context/CurrencyProvider";

type ProductPriceProps = {
	price: number;
	salePrice?: number;
};

export const ProductPrice = ({ price, salePrice }: ProductPriceProps) => {
	const t = useTranslations();
	const { exchangeRate } = useCurrency();

	if (salePrice) {
		return (
			<div className="flex w-full flex-col items-start justify-around">
				<p className="text-xl font-bold text-red-600 line-through">
					{t("product.price", { amount: formatPrice(price, exchangeRate) })}
				</p>
				<span className="text-2xl font-bold">
					{t("product.price", { amount: formatPrice(salePrice, exchangeRate) })}
				</span>
			</div>
		);
	}

	return (
		<p className="w-full text-2xl font-bold text-white">
			{t("product.price", { amount: formatPrice(price, exchangeRate) })}
		</p>
	);
};
