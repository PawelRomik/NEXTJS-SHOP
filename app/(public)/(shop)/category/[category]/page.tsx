import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../../components/ProductDisplay";
import { ApolloQueryResult, DocumentNode } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { GET_PRODUCTS_BY_CATEGORIES } from "../../../../queries/shopPage";
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

async function fetchProducts(category: string, page: number) {
	const client = createApolloClient();
	try {
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_PRODUCTS_BY_CATEGORIES,
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

async function loadProducts(category: string, page: number) {
	const data = await fetchProducts(category, page);
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
					category={product.attributes.categories.data[0].attributes.name}
					imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.images.data[0].attributes.url}`}
					key={product.id}
				></ProductDisplay>
			))}
		</>
	);
}

async function loadPagination(category: string, page: number) {
	const data = await fetchProducts(category, page);
	if (!data) return null;

	return (
		<Pagination currentPage={Number(page)} pagesCount={Number(data.meta.pagination.pageCount)} />
	);
}

export default async function ShopPage({
	params,
	searchParams
}: {
	params: {
		category: string;
	};
	searchParams?: {
		page?: number;
	};
}) {
	revalidatePath("/category/[category]", "page");
	const { category } = params;
	const page = searchParams?.page || 1;

	return (
		<main className=" w-full bg-zinc-950 p-6">
			<h1 className="flex items-center justify-center text-4xl font-bold capitalize text-red-600 lg:justify-start lg:pl-6">
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
					{loadProducts(category, page)}
				</Suspense>
			</Grid>
			<Suspense>{loadPagination(category, page)}</Suspense>
		</main>
	);
}
