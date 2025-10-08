"use client";
import { useTranslations } from "next-intl";
import { getApolloClient } from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_ORDER } from "../queries/order";
import ErrorText from "./common/ErrorText";
import { formatPrice } from "../lib/utils/formatPrice";
import { useCurrency } from "../context/CurrencyProvider";
import { OrderData } from "../queries/productType";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function OrderInformations({ id }: { id: number | string }) {
	const t = useTranslations();
	const { exchangeRate } = useCurrency();
	const { user } = useUser();
	const [order, setOrder] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchOrder(orderId: string | number) {
			try {
				const client = await getApolloClient();
				const { data }: ApolloQueryResult<OrderData> = await client.query({
					query: GET_ORDER,
					variables: {
						user: user?.id,
						orderId: Number(orderId)
					}
				});

				if (data?.orders?.data.length) {
					setOrder(data.orders.data[0].attributes);
				} else {
					setError(true);
				}
			} catch (err) {
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		if (user?.id) {
			fetchOrder(id);
		}
	}, [id, user?.id]);

	if (loading) return <p>Loading...</p>;
	if (error || !order) return <ErrorText />;

	const totalPrice = order.products.reduce(
		(sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
		0
	);

	return (
		<div className="flex flex-col justify-center gap-3 font-bold uppercase text-white">
			<p className="flex items-center gap-3 bg-[rgb(12,12,12)] p-3">
				{t("order.date")}:
				<span className="rounded bg-red-600 p-2">
					{new Date(order.createdAt)
						.toISOString()
						.replace("T", " ")
						.slice(0, 19)
						.replaceAll("-", ".")}
				</span>
			</p>

			<p className="flex items-center gap-3 bg-[rgb(12,12,12)] p-3">
				{t("order.totalPrice")}:
				<span className="rounded bg-red-600  p-2">
					{t("product.price", { amount: formatPrice(totalPrice, exchangeRate) })}
				</span>
			</p>
		</div>
	);
}
