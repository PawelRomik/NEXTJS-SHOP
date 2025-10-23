import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../../components/product-display/ProductDisplay";
import { ApolloQueryResult } from "@apollo/client";
import { getApolloClient } from "../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { QueryResult } from "../../../../queries/productType";
import Pagination from "../../../../components/pagination/Pagination";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../components/product-display/SkeletonProductDisplay";
import { GET_SEARCH_PRODUCTS, GET_SEARCH_PRODUCTS_COUNT } from "../../../../queries/search";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import ErrorText from "../../../../components/common/ErrorText";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "search" });

	return {
		title: `${t("results")} | Ephonix`
	};
}

async function fetchProducts(query: string, page: number, locale: string) {
	try {
		const client = await getApolloClient();
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_SEARCH_PRODUCTS,
			variables: {
				name: query,
				page: Number(page),
				locale: locale
			}
		});

		return data.products;
	} catch {
		return null;
	}
}

async function loadCount(query: string, page: number, locale: string) {
	try {
		const client = await getApolloClient();
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_SEARCH_PRODUCTS_COUNT,
			variables: {
				name: query,
				page: Number(page),
				locale: locale
			}
		});

		return data.products.meta.pagination.total;
	} catch {
		return 0;
	}
}

async function loadProducts(category: string, page: number, locale: string) {
	const data = await fetchProducts(category, page, locale);
	if (!data) return <ErrorText />;

	return (
		<Grid
			width="auto"
			className="shadow-top grid-cols ro-1  gap-10 bg-[rgb(20,20,20)]  p-2 text-white md:grid-cols-2 lg:grid-cols-4 lg:p-6"
		>
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
		</Grid>
	);
}

async function loadPagination(category: string, page: number, locale: string) {
	const data = await fetchProducts(category, page, locale);
	if (!data) return null;

	return (
		<Pagination currentPage={Number(page)} pagesCount={Number(data.meta.pagination.pageCount)} />
	);
}

export default function SearchPage({
	searchParams,
	params: { locale }
}: {
	searchParams?: {
		query?: string;
		page?: number;
	};
	params: {
		locale: string;
	};
}) {
	revalidatePath("/[locale]/search", "page");
	const t = useTranslations("search");

	const query = searchParams?.query;
	const page = searchParams?.page || 1;

	if (!query)
		return (
			<main className=" h-full w-full bg-[rgb(20,20,20)] text-white">
				<p>No Query</p>
			</main>
		);

	return (
		<main className=" h-full w-full flex-1 bg-[rgb(20,20,20)]">
			<div className="flex h-[120px] items-center justify-center bg-[rgb(11,11,11)] text-4xl font-bold uppercase text-white">
				<h2 className=" flex items-center gap-3   text-3xl font-bold uppercase text-white">
					<Suspense>
						<span className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border-4 border-red-600 bg-red-600 text-xl text-white lg:text-2xl">
							{loadCount(query, page, locale)}
						</span>
					</Suspense>

					<span>
						{t("matches")}
						<span className="text-red-600">{" " + query}</span>
					</span>
				</h2>
			</div>

			<Suspense fallback={<SkeletonProductDisplay />}>{loadProducts(query, page, locale)}</Suspense>
			<Suspense>{loadPagination(query, page, locale)}</Suspense>
		</main>
	);
}
