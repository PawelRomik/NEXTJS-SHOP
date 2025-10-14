"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeItem, increaseQuantity, removeAllOfItem } from "../../redux/cardReducer";
import { useTranslations } from "next-intl";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCurrency } from "../../context/CurrencyProvider";
import type { Product } from "./useCartProducts";

type CartItemProps = {
	item: Product;
};

export default function CartItem({ item }: CartItemProps) {
	const dispatch = useDispatch();
	const t = useTranslations();
	const { exchangeRate } = useCurrency();

	return (
		<div className="mx-auto flex w-[90%] items-center justify-between gap-5 rounded-lg bg-[rgb(32,32,32)] px-5 py-3">
			<Link title="Product" href={`/product/${item.uuid}`}>
				<Image
					className="h-[100px] w-[80px] object-contain"
					src={process.env.NEXT_PUBLIC_STRAPI_PATH + item.image}
					width={80}
					height={100}
					alt={t("cart.productImage")}
				/>
			</Link>

			<div className="flex flex-1 flex-col items-center justify-center text-center">
				<h1 className="text-lg font-medium">{item.name}</h1>
				<p className="text-red-600">
					{`${item.quantity} x ${t("product.price", { amount: formatPrice(item.price, exchangeRate) })}`}
				</p>
				{item.onSale && (
					<div className="mt-1 bg-red-600 px-2 py-0.5 text-xs font-bold uppercase">
						{t("cart.sale")}
					</div>
				)}
			</div>

			<div className="flex items-center gap-2">
				<button aria-label="Decrease" onClick={() => dispatch(removeItem(item.uuid))}>
					<i className="ri-indeterminate-circle-line text-2xl text-gray-400 hover:text-red-600" />
				</button>
				<button aria-label="Increase" onClick={() => dispatch(increaseQuantity(item.uuid))}>
					<i className="ri-add-circle-line text-2xl text-gray-400 hover:text-red-600" />
				</button>
				<button aria-label="Remove" onClick={() => dispatch(removeAllOfItem(item.uuid))}>
					<i className="ri-delete-bin-line text-2xl text-gray-400 hover:text-red-600" />
				</button>
			</div>
		</div>
	);
}
