import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../../components/ProductDisplay";
import { ApolloQueryResult, DocumentNode } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import {
	GET_NEW_PRODUCTS,
	GET_PRODUCTS_BY_CATEGORIES,
	GET_SALE_PRODUCTS
} from "../../../../queries/shopPage";
import { QueryResult } from "../../../../queries/productType";
import { Metadata } from "next";
import Pagination from "../../../../components/Pagination";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../components/SkeletonProductDisplay";

export async function generateMetadata({
	params
}: {
	params: { category: string };
}): Promise<Metadata> {
	const { category } = params;
	return {
		title: `${category.charAt(0).toUpperCase() + category.slice(1)} | Ephonix`
	};
}

async function fetchProducts(query: DocumentNode, category: string, page: number) {
	const client = createApolloClient();
	try {
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: query,
			variables: {
				category: category,
				page: Number(page)
			}
		});

		return data.products;
	} catch {
		return null;
	}
}

async function loadProducts(query: DocumentNode, category: string, page: number) {
	const data = await fetchProducts(query, category, page);
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

/*
async function loadPagination(query: DocumentNode, category: string, sex: string, page: number) {
	const data = await fetchProducts(query, category, page);
	if (!data) return null;

	return (
		<Pagination currentPage={Number(page)} pagesCount={Number(data.meta.pagination.pageCount)} />
	);
}*/

export default async function ShopPage({
	params
}: {
	params: {
		category: string;
		searchParams?: {
			page?: number;
		};
	};
}) {
	revalidatePath("/category/[category]", "page");
	const { category, searchParams } = params;
	const page = searchParams?.page || 1;

	let query;
	switch (params.category) {
		case "new":
			query = GET_NEW_PRODUCTS;
			break;
		case "sale":
			query = GET_SALE_PRODUCTS;
			break;
		default:
			query = GET_PRODUCTS_BY_CATEGORIES;
	}

	return (
		<main className=" w-full bg-zinc-950 p-6">
			<h1 className="pl-6 text-4xl font-bold capitalize text-red-600">
				<span>{category + "s"}</span>
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
					{loadProducts(query, category, page)}
				</Suspense>
			</Grid>
		</main>
	);
}
