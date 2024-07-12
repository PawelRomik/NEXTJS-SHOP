import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../apollo-client";
import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../components/ProductDisplay";
import { QueryResult } from "../../../queries/productType";
import { GET_SEARCH_PRODUCTS, GET_SEARCH_PRODUCTS_COUNT } from "../../../queries/search";

import { Metadata } from "next";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../components/SkeletonProductDisplay";
import Pagination from "../../../components/Pagination";

export const metadata: Metadata = {
	title: "N3XT | Search results"
};

async function fetchProducts(query: string, currPage: number, pagination: boolean) {
	const client = createApolloClient();
	try {
		if (pagination) {
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_SEARCH_PRODUCTS,
				variables: {
					name: query,
					page: Number(currPage)
				}
			});
			return data.products;
		} else {
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_SEARCH_PRODUCTS_COUNT,
				variables: {
					name: query
				}
			});
			console.log(data);
			return data.products;
		}
	} catch {
		return null;
	}
}

async function loadProducts(query: string, currPage: number) {
	const data = await fetchProducts(query, currPage, true);
	if (!data)
		return (
			<p className="col-span-4 row-auto w-full text-center text-3xl font-bold text-zinc-400">
				<i className="ri-error-warning-line"></i> An error occurred while loading products, please
				try again later.
			</p>
		);

	return (
		<>
			{data.data.map((product) => (
				<ProductDisplay
					id={product.id}
					name={product.attributes.name}
					desc={product.attributes.desc}
					price={product.attributes.price}
					salePrice={product.attributes.salePrice}
					category={product.attributes.categories.data[1].attributes.name}
					imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.images.data[0].attributes.url}`}
					key={product.id}
				></ProductDisplay>
			))}
		</>
	);
}

async function loadPagination(query: string, currPage: number) {
	const data = await fetchProducts(query, currPage, true);
	if (!data) return null;

	return (
		<Pagination
			currentPage={Number(currPage)}
			pagesCount={Number(data.meta.pagination.pageCount)}
		/>
	);
}

async function loadCount(query: string, currPage: number) {
	const data = await fetchProducts(query, currPage, false);
	if (!data) return null;

	return data.data.length;
}

export default async function SearchPage({
	searchParams
}: {
	searchParams?: {
		query?: string;
		page?: number;
	};
}) {
	const query = searchParams?.query || "";
	const currPage = searchParams?.page || 1;

	return (
		<main className="flex-1 p-6	">
			<h1 className="flex items-center pl-6 text-4xl font-bold">
				<Suspense>
					<span className="mr-2 rounded-full border-2 border-black px-3 text-2xl">
						{loadCount(query, currPage)}
					</span>
				</Suspense>

				<span>Matches for &quot;{query}&quot;</span>
			</h1>

			<Grid gap="4" width="auto" className="grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-4">
				<Suspense
					fallback={
						<>
							{[...Array(8)].map((_, index) => (
								<SkeletonProductDisplay key={index} />
							))}
						</>
					}
				>
					{loadProducts(query, currPage)}
				</Suspense>
			</Grid>
			<Suspense>{loadPagination(query, currPage)}</Suspense>
		</main>
	);
}
