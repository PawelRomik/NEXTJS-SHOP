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
			<h2 className="mb-2 text-2xl font-bold uppercase text-white">{t("product.products")}</h2>
			<table className="flex flex-col gap-3">
				{products.map((product) => (
					<tr
						key={product.id}
						className="flex h-[200px] w-full items-center justify-between gap-5 bg-[rgb(32,32,32)] p-3 font-bold uppercase text-white"
					>
						<td className="flex h-full flex-col items-center justify-center gap-3 bg-[rgb(20,20,20)] px-4 py-2">
							<div className="flex  items-center justify-center">
								<Link href={`/product/${product.id}`} className="max-h-[200px] max-w-[200px] p-3">
									<Image
										src={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.imageUrl}`}
										alt="Product image"
										width={300}
										height={300}
									/>
								</Link>
							</div>
						</td>

						<td className="flex h-full flex-[1] items-center justify-between gap-5   font-bold uppercase">
							<div className="flex h-full flex-[2] flex-col  bg-[rgb(20,20,20)] ">
								<p className="w-full border-b-2 border-red-600 p-2 text-center text-xl">
									{product.name}
								</p>
								<p className="p-3">
									<span>Price: </span>
									<span className="text-red-600">
										{t("product.price", { amount: formatPrice(product.price, exchangeRate) })}
									</span>
								</p>
								<p className="px-3">
									<span>Amount: </span>
									<span className="text-red-600">{product.quantity}</span>
								</p>
								<p className="p-3">
									<span>{t("order.total")}: </span>
									<span className="text-red-600">
										{t("product.price", {
											amount: formatPrice(product.price * product.quantity, exchangeRate)
										})}
									</span>
								</p>
							</div>
						</td>

						<td className="flex h-full items-center justify-between gap-5   font-bold uppercase">
							<div className="flex h-full flex-1 items-center justify-center bg-[rgb(20,20,20)] ">
								<Link
									className="flex h-full w-full items-center justify-center px-4 py-2 transition-all hover:bg-red-600"
									href={`/product/${product.id}`}
								>
									<button>
										<i className="ri-arrow-right-s-fill text-6xl "></i>
									</button>
								</Link>
							</div>
						</td>
					</tr>
				))}
			</table>
		</div>
	);
}
