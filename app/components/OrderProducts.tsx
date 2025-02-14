"use client";
import { useLocale, useTranslations } from "next-intl";
import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_ORDER, GET_ORDER_PRODUCT } from "../queries/order";
import ErrorText from "./ErrorText";
import { formatPrice } from "../lib/utils/formatPrice";
import { useCurrency } from "../context/CurrencyProvider";
import { OrderData, QueryResult } from "../queries/productType";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderProducts({ id }: { id: number | string }) {
	const t = useTranslations();
	const locale = useLocale();
	const { exchangeRate } = useCurrency();
	const { user } = useUser();
	const [order, setOrder] = useState<any>(null);
	const [products, setProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
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

				if (data?.orders?.data.length) {
					setOrder(data.orders.data[0].attributes);
				} else {
					setError(true);
				}
			} catch (err) {
				console.error(err);
				setError(true);
			}
		}

		if (user?.id) {
			fetchOrder(id);
		}
	}, [id, user?.id]);

	useEffect(() => {
		async function fetchProducts() {
			if (!order) return;
			try {
				const client = await createApolloClient();
				const productRequests = order.products.map(async (product: any) => {
					const { data }: ApolloQueryResult<QueryResult> = await client.query({
						query: GET_ORDER_PRODUCT,
						variables: {
							productId: product.id,
							locale: locale
						}
					});

					return {
						id: product.id,
						name: data.products.data[0].attributes.name,
						imageUrl: data.products.data[0].attributes.images.data[0].attributes.url,
						price: product.price,
						quantity: product.quantity
					};
				});

				const productData = await Promise.all(productRequests);
				setProducts(productData);
			} catch (err) {
				console.error(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		if (order) {
			fetchProducts();
		}
	}, [order, locale]);

	if (loading) return <p>Loading...</p>;
	if (error || !order) return <ErrorText />;

	return (
		<div className="bg-[rgb(12,12,12)] p-5">
			<h2 className="mb-2 text-2xl font-bold uppercase text-white">{t("product.products")}:</h2>
			<table className="flex flex-col gap-3">
				{products.map((product) => (
					<tr
						key={product.id}
						className="flex w-full items-center justify-center gap-[30%] bg-red-600 p-3 text-white"
					>
						<td className="flex items-center justify-center gap-3">
							<div className="flex max-h-[100px] max-w-[100px] items-center justify-center">
								<Link href={`/product/${product.id}`}>
									<Image
										src={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.imageUrl}`}
										alt="Product image"
										width={300}
										height={300}
									/>
								</Link>
							</div>
							{product.name}
						</td>

						<td className="flex flex-col items-center justify-center">
							<p className="w-full">
								{t("product.price", { amount: formatPrice(product.price, exchangeRate) })} x{" "}
								{product.quantity}
							</p>
							<p className="w-full">
								{t("order.total")}:{" "}
								{t("product.price", {
									amount: formatPrice(product.price * product.quantity, exchangeRate)
								})}
							</p>
						</td>
						<td>
							<Link className="transition-all" href={`/product/${product.id}`}>
								<button>
									<i className="ri-arrow-right-s-fill text-6xl "></i>
								</button>
							</Link>
						</td>
					</tr>
				))}
			</table>
		</div>
	);
}
