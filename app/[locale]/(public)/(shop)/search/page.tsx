import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../../components/ProductDisplay";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { QueryResult } from "../../../../queries/productType";
import { Metadata } from "next";
import Pagination from "../../../../components/Pagination";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../components/SkeletonProductDisplay";
import { GET_SEARCH_PRODUCTS, GET_SEARCH_PRODUCTS_COUNT } from "../../../../queries/search";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
	title: "Search results | Ephonix"
};

async function fetchProducts(query: string, page: number, locale: string) {
	try {
		const client = createApolloClient();
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
		const client = createApolloClient();
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
		return null;
	}
}

async function loadProducts(category: string, page: number, locale: string) {
	const data = await fetchProducts(category, page, locale);
	if (!data) return null;

	return (
		<>
			{data.data.map((product) => (
				<ProductDisplay
					uuid={product.attributes.uuid}
					name={product.attributes.name}
					desc={product.attributes.desc}
					price={product.attributes.price}
					salePrice={product.attributes.salePrice}
					category={product.attributes.categories.data[0].attributes.name}
					imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.images.data[0].attributes.url}`}
					key={product.id}
				></ProductDisplay>
			))}
		</>
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

	if (!query) return null;

	return (
		<main className=" w-full bg-zinc-950 p-6">
			<h1 className="flex items-center justify-center text-3xl font-bold text-red-600 lg:justify-start lg:pl-6 lg:text-4xl">
				<Suspense>
					<span className="mr-2 rounded-full border-4 border-red-600 px-3 text-xl text-white lg:px-[0.75rem] lg:text-2xl">
						{loadCount(query, page, locale)}
					</span>
				</Suspense>

				<span>
					{t("matches")}
					<span className="text-white">{" " + query}</span>
				</span>
			</h1>
			<Grid gap="4" width="auto" className="grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-4 lg:p-6">
				<Suspense
					fallback={
						<>
							{[...Array(8)].map((_, index) => (
								<SkeletonProductDisplay key={index} />
							))}
						</>
					}
				>
					{loadProducts(query, page, locale)}
				</Suspense>
			</Grid>
			<Suspense>{loadPagination(query, page, locale)}</Suspense>
		</main>
	);
}
