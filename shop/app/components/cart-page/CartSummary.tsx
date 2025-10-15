"use client";
import { useMemo, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useCurrency } from "../../lib/context/CurrencyProvider";
import { useTranslations } from "next-intl";
import { useUser } from "@clerk/nextjs";
import { formatPrice } from "../../lib/utils/formatPrice";
import type { Product } from "../../lib/hooks/useCartProducts";

type CartSummaryProps = {
	products: Product[];
	discount: number;
	locale: string;
};

export default function CartSummary({ products, discount, locale }: CartSummaryProps) {
	const t = useTranslations();
	const { exchangeRate, currency } = useCurrency();
	const { user } = useUser();
	const [loading, setLoading] = useState(false);

	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

	const { oldPrice, price } = useMemo(() => {
		const subtotal = products.reduce(
			(sum, item) => sum + item.quantity * parseFloat(formatPrice(item.price, exchangeRate)),
			0
		);
		const discounted = subtotal - (subtotal * discount) / 100;
		return { oldPrice: subtotal.toFixed(2), price: discounted.toFixed(2) };
	}, [products, discount, exchangeRate]);

	const handlePayment = async () => {
		if (!stripePromise) return;
		setLoading(true);
		try {
			const stripe = await stripePromise;
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_STRAPI_PATH}/api/orders`,
				{ products, currency, exchangeRate, discount, locale, user: user?.id },
				{ headers: { Authorization: "bearer " + process.env.NEXT_PUBLIC_STRAPI_AUTH_KEY } }
			);
			await stripe?.redirectToCheckout({ sessionId: res.data.stripeSession.id });
		} catch {
			alert(t("auth.unexpectedError"));
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="total flex w-full flex-col justify-end text-lg  font-medium uppercase md:w-auto">
			<div className="flex items-end justify-end ">
				<span className="text-sm text-red-900 line-through">
					{t("product.price", { amount: oldPrice })}
				</span>
			</div>
			<div className="flex items-center justify-center gap-3 bg-[rgb(12,12,12)] font-bold">
				{discount != 0 && <span className="rounded-lg bg-red-600 px-3">-{discount}%</span>}
				<span>{t("cart.subtotal")}</span>
				<span className="text-red-600">{t("product.price", { amount: price })}</span>
			</div>
			<button
				onClick={handlePayment}
				disabled={!products.length || loading}
				className="mb-3 flex w-full items-center justify-center gap-5 bg-red-600 p-3 font-bold uppercase text-white transition hover:bg-red-500 disabled:opacity-50"
			>
				{t("cart.checkout")}
			</button>
		</div>
	);
}
