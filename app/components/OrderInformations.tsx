"use client";
import { useLocale, useTranslations } from "next-intl";
import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_ORDER } from "../queries/order";
import ErrorText from "./ErrorText";
import { formatPrice } from "../lib/utils/formatPrice";
import { useCurrency } from "../context/CurrencyProvider";
import { OrderData } from "../queries/productType";
import { Suspense } from "react";
import { useUser } from "@clerk/nextjs";

export default function OrderInformations({ id }: { id: number | string }) {
	const t = useTranslations();
	const locale = useLocale();
	const { exchangeRate } = useCurrency();
	const { user } = useUser();

	async function fetchOrder(orderId: string | number) {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<OrderData> = await client.query({
				query: GET_ORDER,
				variables: {
					user: user?.id,
					orderId: Number(orderId)
				}
			});

			return data.orders;
		} catch (err) {
			console.log(err);
		}
	}

	async function loadProducts(orderId: string | number, locale: string) {
		const data = await fetchOrder(orderId);

		if (!data) return <ErrorText />;
		const order = data.data[0].attributes;
		const totalPrice = order.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
		return (
			<div className="flex flex-col justify-center gap-3 text-white">
				<p className="flex items-center gap-3">
					{t("order.date")}:
					<span className="rounded bg-zinc-800 p-2">
						{new Date(order.createdAt)
							.toISOString()
							.replace("T", " ")
							.slice(0, 19)
							.replaceAll("-", ".")}
					</span>
				</p>

				<p className="flex items-center gap-3">
					{t("order.totalPrice")}:
					<span className="rounded bg-zinc-800 p-2">
						{t("product.price", { amount: formatPrice(totalPrice, exchangeRate) })}
					</span>
				</p>
				<p className="flex items-center gap-3">
					{t("order.status")}:<span className="rounded bg-green-500 p-2">{t("order.success")}</span>
				</p>
			</div>
		);
	}

	return <Suspense fallback={<p>Loading</p>}>{loadProducts(id, locale)}</Suspense>;
}
