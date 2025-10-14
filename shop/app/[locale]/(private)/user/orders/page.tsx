import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { GET_ORDER_HISTORY } from "../../../../queries/order";
import { OrderHistoryData } from "../../../../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import { getApolloClient } from "../../../../../apollo-client";
import ErrorText from "../../../../components/common/ErrorText";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import Pagination from "../../../../components/pagination/Pagination";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ProductSectionTitle from "../../../../components/ProductSectionTitle";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "order" });

	return {
		title: `${t("history")} | Ephonix`
	};
}

async function fetchProducts(page: number) {
	try {
		const user = await currentUser();
		const client = await getApolloClient();
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
					className="flex h-[80px] w-full items-center justify-between bg-[rgb(20,20,20)]   text-xl  text-white"
				>
					<td className="flex h-full flex-1 items-center justify-start  lg:pr-8">
						<div className="flex h-full items-center justify-start gap-2 px-2 lg:gap-8 lg:px-8">
							<div className="flex h-[10px] w-[10px] items-center justify-center rounded-full  bg-green-600 p-3"></div>
							<p className="flex items-center justify-center">
								<span className="hidden lg:inline">{t("order")}:</span>
								<span>#{product.id}</span>
							</p>
						</div>
					</td>
					<td className="flex h-full flex-1 items-center justify-center lg:pl-8">
						<div className="flex h-full items-center justify-center px-8 text-center">
							{new Date(product.attributes.createdAt)
								.toISOString()
								.replace("T", " ")
								.slice(0, 19)
								.replaceAll("-", ".")}
						</div>
					</td>
					<td className="flex h-full flex-1 items-center justify-end ">
						<Link
							href={`order/${product.id}`}
							className=" h-full transition-all hover:text-red-600"
						>
							<div className="flex h-full items-center justify-center  px-2">
								<button className="h-full w-full p-3 ">
									<i className="ri-arrow-right-s-fill text-4xl"></i>
								</button>
							</div>
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
		<main className=" flex w-full flex-1 flex-col bg-[rgb(20,20,20)]">
			<ProductSectionTitle title={t("history")} />
			<div className="shadow-inset flex h-full flex-col items-center justify-between pt-5">
				<Suspense fallback={<p>Loading</p>}>
					<table className="flex w-full  flex-row flex-wrap items-start justify-start gap-2 overflow-y-auto bg-[rgb(12,12,12)]  lg:w-[95%] lg:px-2 ">
						<tr className="sticky top-0 flex h-[80px] w-full items-center justify-between border-b-2 border-red-600  bg-[rgb(12,12,12)] p-3 text-2xl uppercase  text-white">
							<th className="flex-1  text-start lg:pl-8">{t("order")}</th>
							<th className="flex-1  text-center lg:pl-8">{t("date")}</th>
							<th className="flex-1 text-end">{t("details")}</th>
						</tr>
						{loadProducts(page, locale)}
						<tr className="bg-[rgb(12,12,12)"></tr>
					</table>
				</Suspense>
				<Suspense>{loadPagination(page)}</Suspense>
			</div>
		</main>
	);
}
