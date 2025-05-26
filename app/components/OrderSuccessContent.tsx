"use client";
import { useTranslations } from "next-intl";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/cardReducer";
import Link from "next/link";
import SkeletonProductDisplay from "./SkeletonProductDisplay";
import ProductDisplay from "./ProductDisplay";
import { getTranslations } from "next-intl/server";
import createApolloClient from "../../apollo-client";
import { QueryResult } from "../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import { GET_OTHER_PRODUCTS } from "../queries/order";
import Image from "next/image";
import logo from "../../public/logolg.png";

export default function OrderSuccessContent({ locale }: { locale: string }) {
	const t = useTranslations("order");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetCart());
	}, [dispatch]);

	async function fetchProducts(locale: string) {
		const client = await createApolloClient();
		try {
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_OTHER_PRODUCTS,
				variables: {
					locale: locale
				}
			});

			return data.products;
		} catch {
			return null;
		}
	}

	async function loadProducts(locale: string) {
		const data = await fetchProducts(locale);

		if (!data) return null;

		return (
			<>
				<h2 className="col-span-4 row-auto mt-6 w-full pb-4 text-3xl font-bold text-zinc-400">
					{t("otherProducts")}
				</h2>
				<div className=" w-full overflow-hidden lg:flex-1">
					<div className="flex max-w-[100%] gap-6 overflow-x-auto">
						{data.data.map((product) => (
							<ProductDisplay
								uuid={product.attributes.uuid}
								name={product.attributes.name}
								desc={product.attributes.desc}
								price={product.attributes.price}
								salePrice={product.attributes.salePrice}
								category={product.attributes.categories.data[0].attributes.name}
								imageUrl={product.attributes.images.data[0].attributes.url}
								key={product.id}
							></ProductDisplay>
						))}
					</div>
				</div>
			</>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center gap-2 uppercase">
			<div className="flex h-[380px] items-stretch justify-around gap-3  ">
				<div className="flex  flex-[3] flex-col items-center justify-center gap-2  text-center text-3xl font-bold text-white ">
					<h2 className="flex h-full w-full items-center justify-center bg-[rgb(27,27,27)] p-3 text-6xl text-green-400">
						<div className="flex h-[100px] w-[320px] items-center justify-center rounded-lg border-4 border-dashed border-[rgb(16,16,16)]">
							<span className="z-10 flex  rotate-3 items-center justify-center rounded-lg bg-green-600 px-6 py-2  text-white outline-double outline-4 outline-green-700">
								{t("success")}
							</span>
						</div>
					</h2>

					<div className="w-full bg-[rgb(16,16,16)] p-3">
						<p>{t("orderSuccess")}</p>
						<p className="text-lg text-gray-400">{t("estimatedDelivery")}</p>
					</div>

					<div className="flex w-full justify-between gap-2">
						<div className="flex flex-[3] flex-col items-center justify-center gap-2 bg-[rgb(27,27,27)]">
							<h3 className="text-lg">Check your order informations</h3>
							<button className="rounded-lg bg-red-600 px-6 py-3 transition hover:bg-red-500">
								{t("order")} #123
							</button>
						</div>
						<div className="flex flex-[2] flex-col items-start justify-center  text-lg">
							<p className="w-full bg-[rgb(27,27,27)] p-3">Order id: #123</p>
							<p className="w-full bg-[rgb(16,16,16)] p-3">Total price: 130zł</p>
							<p className="w-full bg-[rgb(27,27,27)] p-3">Date: 26.05.2025</p>
						</div>
					</div>
				</div>
				<div className="flex h-full flex-[1] bg-[rgb(27,27,27)]">
					<Image width={800} alt="logo" height={800} src={logo} />
				</div>
			</div>
			<div className="flex w-full items-center justify-center bg-[rgb(16,16,16)] p-3">
				<Link href="/" title={t("home")}>
					<button className="rounded-lg bg-red-600 px-12 py-3 text-2xl font-bold uppercase text-white transition hover:bg-red-500">
						{t("home")}
					</button>
				</Link>
			</div>
		</div>
	);
}
