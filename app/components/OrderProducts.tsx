"use client";
import { useLocale, useTranslations } from "next-intl";
import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_ORDER, GET_ORDER_PRODUCT } from "../queries/order";
import ErrorText from "./ErrorText";
import { formatPrice } from "../lib/utils/formatPrice";
import { useCurrency } from "../context/CurrencyProvider";
import { OrderData, QueryResult } from "../queries/productType";
import { Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function OrderProducts({ id }: { id: number | string }) {
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

	async function getProduct(id: string | number, price: number, quantity: number, locale: string) {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_ORDER_PRODUCT,
				variables: {
					productId: id,
					locale: locale
				}
			});
			const product = data.products.data[0].attributes;
			return (
				<tr className="flex w-full items-center justify-center gap-[30%] bg-zinc-900 p-3 text-white">
					<td className="flex items-center justify-center gap-3">
						<div className="flex max-h-[100px] max-w-[100px] items-center justify-center">
							<Link href={`/product/${id}`}>
								<Image
									src={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.images.data[0].attributes.url}`}
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
							{t("product.price", { amount: formatPrice(price, exchangeRate) })} x {quantity}
						</p>
						<p className="w-full">
							{t("order.total")}:{" "}
							{t("product.price", { amount: formatPrice(price * quantity, exchangeRate) })}
						</p>
					</td>
					<td>
						<Link className="transition-all hover:text-red-600" href={`/product/${id}`}>
							<button>
								<i className="ri-arrow-right-s-fill text-4xl"></i>
							</button>
						</Link>
					</td>
				</tr>
			);
		} catch (err) {
			console.log(err);
		}
	}

	async function loadProducts(orderId: string | number, locale: string) {
		const data = await fetchOrder(orderId);

		if (!data) return <ErrorText />;
		const order = data.data[0].attributes;
		const productRows = await Promise.all(
			order.products.map((product) =>
				getProduct(product.id, product.price, product.quantity, locale)
			)
		);
		return (
			<div>
				<h2 className="text-2xl text-white">{t("product.products")}: </h2>
				<table className="flex flex-col gap-3">{productRows}</table>
			</div>
		);
	}

	return <Suspense fallback={<p>Loading</p>}>{loadProducts(id, locale)}</Suspense>;
}
