"use client";
import Image from "next/image";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useTranslations } from "next-intl";
import { useCurrency } from "../../lib/context/CurrencyProvider";

type CartPopoverItemDetailsProps = {
	item: {
		name: string;
		quantity: number;
		onSale: boolean;
		price: number;
		image: string;
	};
};

export default function CartPopoverItemDetails({ item }: CartPopoverItemDetailsProps) {
	const t = useTranslations();
	const { exchangeRate } = useCurrency();
	return (
		<>
			<Image
				className="h-[100px] max-h-[100px] w-[80px] max-w-[80px] object-contain"
				src={process.env.NEXT_PUBLIC_STRAPI_PATH + item.image}
				width={80}
				height={100}
				alt={t("cart.productImage")}
			/>
			<div className="details">
				<h1 className="text-lg font-medium">{item.name}</h1>
				<div className="flex items-center justify-between gap-2">
					<p className="text-red-600">
						{item.quantity} x{" "}
						{t("product.price", { amount: formatPrice(item.price, exchangeRate) })}
					</p>
					{item.onSale && (
						<div className="ml-2 flex items-center justify-center bg-red-600 px-2 font-bold uppercase">
							{t("cart.sale")}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
