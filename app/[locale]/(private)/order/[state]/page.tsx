import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import Link from "next/link";
import ProductDisplay from "../../../../components/ProductDisplay";
import createApolloClient from "../../../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../../../../queries/productType";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../components/SkeletonProductDisplay";
import { useTranslations } from "next-intl";
import { GET_OTHER_PRODUCTS } from "../../../../queries/productPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "order" });

	return {
		title: `${t("status")} | Ephonix`
	};
}

async function fetchProducts(locale: string) {
	const client = createApolloClient();
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
	const t = await getTranslations({ locale, namespace: "order" });

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
							category={product.attributes.categories.data[1].attributes.name}
							imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.images.data[0].attributes.url}`}
							key={product.id}
						></ProductDisplay>
					))}
				</div>
			</div>
		</>
	);
}

export default function OrderPage({
	params: { state, locale }
}: {
	params: { state: string; locale: string };
}) {
	revalidatePath("/[locale]/order/[state]", "page");
	const t = useTranslations("order");

	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-6">
			<p className="col-span-4 row-auto mt-6 w-full text-center text-3xl font-bold text-zinc-400">
				<i className="ri-error-warning-line"></i>
				{t(state === "success" ? "orderSuccess" : "orderFail")}
			</p>
			<Link href="/" title={t("home")}>
				<button className="rounded-full bg-zinc-950 px-10 py-4 text-white">{t("home")}</button>
			</Link>
			<div className="flex w-[80%] flex-col items-center justify-center">
				<Suspense
					fallback={
						<>
							{[...Array(5)].map((_, index) => (
								<SkeletonProductDisplay key={index} />
							))}
						</>
					}
				>
					{loadProducts(locale)}
				</Suspense>
			</div>
		</div>
	);
}
