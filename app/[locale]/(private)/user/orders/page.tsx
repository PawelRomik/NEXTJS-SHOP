import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { GET_ORDER_HISTORY } from "../../../../queries/order";
import { OrderHistoryData } from "../../../../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import ErrorText from "../../../../components/ErrorText";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import Pagination from "../../../../components/Pagination";
import { useTranslations } from "next-intl";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "order" });

	return {
		title: `${t("history")} | Ephonix`
	};
}

async function fetchProducts(page: number) {
	try {
		const user = await currentUser();
		const client = await createApolloClient();
		const { data }: ApolloQueryResult<OrderHistoryData> = await client.query({
			query: GET_ORDER_HISTORY,
			variables: {
				user: user?.id,
				page: Number(page)
			}
		});

		return data.orders;
	} catch (err) {
		console.log(err);
	}
}

async function loadProducts(page: number, locale: string) {
	const data = await fetchProducts(page);
	const t = await getTranslations({ locale, namespace: "order" });
	if (!data) return <ErrorText />;

	return (
		<>
			{data.data.map((product) => (
				<tr
					key={product.id}
					className="flex h-[80px] w-full items-center justify-between  bg-zinc-800 text-2xl  text-white"
				>
					<td className="flex h-full gap-5 bg-zinc-900 p-3">
						<div className="flex items-center justify-center bg-green-600 p-2">{t("success")}</div>
						<p className="flex items-center justify-center">
							{t("order")}: #{product.id}
						</p>
					</td>
					<td className="flex h-full items-center justify-center bg-zinc-900 p-3">
						{new Date(product.attributes.createdAt)
							.toISOString()
							.replace("T", " ")
							.slice(0, 19)
							.replaceAll("-", ".")}
					</td>
					<td className="flex h-full items-center justify-center bg-zinc-900">
						<Link href={`order/${product.id}`} className="transition-all hover:text-red-600">
							<button className="h-full w-full p-3 ">
								<i className="ri-arrow-right-s-fill text-4xl"></i>
							</button>
						</Link>
					</td>
				</tr>
			))}
		</>
	);
}

async function loadPagination(page: number) {
	const data = await fetchProducts(page);
	if (!data) return null;

	return (
		<Pagination currentPage={Number(page)} pagesCount={Number(data.meta.pagination.pageCount)} />
	);
}

export default function OrderHistoryPage({
	searchParams,
	params: { locale }
}: {
	searchParams?: {
		query?: string;
		page?: number;
	};
	params: { locale: string };
}) {
	revalidatePath("/[locale]/user/orders", "page");
	const page = searchParams?.page || 1;
	const t = useTranslations("order");

	return (
		<main className=" flex w-full flex-1 flex-col gap-3 bg-zinc-950 p-5">
			<h1 className="text-3xl font-bold uppercase text-white">{t("history")}</h1>
			<div className="flex h-full flex-col items-center justify-around">
				<Suspense fallback={<p>Loading</p>}>
					<table className="flex h-[600px] flex-row flex-wrap items-start justify-start gap-2 overflow-y-auto ">
						<tr className="sticky top-0 flex h-[80px] w-full items-center justify-between border-b-2 border-red-600  bg-zinc-900 p-3 text-2xl  text-white">
							<th className="flex gap-10">
								<p>{t("statusShort")}</p>
								<p>{t("order")}</p>
							</th>
							<th>{t("date")}</th>
							<th>{t("details")}</th>
						</tr>
						{loadProducts(page, locale)}
					</table>
				</Suspense>
				<Suspense>{loadPagination(page)}</Suspense>
			</div>
		</main>
	);
}
