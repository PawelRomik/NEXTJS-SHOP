"use client";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../redux/cardReducer";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useCartProducts } from "./useCartProducts";
import CartItem from "./CartItem";
import CartDiscount from "./CartDiscount";
import CartSummary from "./CartSummary";
import CartNoProducts from "./CartNoProducts";
import CartCounter from "./CartCounter";

type RootState = {
	cart: {
		products: { id: string; quantity: number }[];
		count: number;
	};
};

export default function CartContent() {
	const t = useTranslations("cart");
	const locale = useLocale();
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart);
	const [discount, setDiscount] = useState(0);

	const products = useCartProducts(cart.products, locale);

	return (
		<div className="z-50 flex h-full flex-col uppercase text-white">
			<CartCounter count={cart.count} />

			{products.length > 0 ? (
				<>
					<div className="flex flex-1 flex-col gap-4 overflow-y-auto pt-5">
						{products.map((item) => (
							<CartItem key={item.uuid} item={item} />
						))}
					</div>

					<div className="mt-auto flex w-full flex-col-reverse gap-8 bg-[rgb(12,12,12)] p-3 px-8 md:flex-row">
						<CartDiscount onDiscountApply={setDiscount} />
						<div className="flex flex-1 flex-col items-end justify-center">
							<CartSummary products={products} discount={discount} locale={locale} />
							<button
								onClick={() => dispatch(resetCart())}
								className="cursor-pointer bg-[rgb(26,26,26)] px-4 py-3 text-xs font-bold transition hover:bg-red-600"
							>
								{t("resetBtn")}
							</button>
						</div>
					</div>
				</>
			) : (
				<CartNoProducts />
			)}
		</div>
	);
}
