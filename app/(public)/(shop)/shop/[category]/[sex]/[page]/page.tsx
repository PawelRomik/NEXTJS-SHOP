import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../../../../components/ProductDisplay";
import { ApolloQueryResult, DocumentNode } from "@apollo/client";
import createApolloClient from "../../../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import {
	GET_NEW_PRODUCTS,
	GET_PRODUCTS_BY_CATEGORIES,
	GET_SALE_PRODUCTS
} from "../../../../../../queries/shopPage";
import { QueryResult } from "../../../../../../queries/productType";
import { Metadata } from "next";
import Pagination from "../../../../../../components/Pagination";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../../../components/SkeletonProductDisplay";

export async function generateMetadata({
	params
}: {
	params: { category: string; sex?: string };
}): Promise<Metadata> {
	const { category } = params;
	return {
		title: `N3XT | ${category.charAt(0).toUpperCase() + category.slice(1)}`
	};
}

async function fetchProducts(query: DocumentNode, category: string, sex: string, page: number) {
	const client = createApolloClient();
	try {
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: query,
			variables: {
				category: category,
				sex: sex === "all" ? ["male", "female"] : [sex],
				page: Number(page)
			}
		});

		return data.products;
	} catch {
		return null;
	}
}

async function testF(query: DocumentNode, category: string, sex: string, page: number) {
	const data = await fetchProducts(query, category, sex, page);
	if (!data) return <p>Error</p>;

	return (
		<>
			{data.data.map((product) => (
				<ProductDisplay
					id={product.id}
					name={product.attributes.name}
					price={product.attributes.price}
					onSale={product.attributes.onSale}
					salePrice={product.attributes.salePrice}
					category={product.attributes.categories.data[1].attributes.name}
					imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.image.data.attributes.url}`}
					key={product.id}
				></ProductDisplay>
			))}
		</>
	);
}

async function testP(query: DocumentNode, category: string, sex: string, page: number) {
	const data = await fetchProducts(query, category, sex, page);
	if (!data) return null;

	return (
		<Pagination currentPage={Number(page)} pagesCount={Number(data.meta.pagination.pageCount)} />
	);
}

export default async function ShopPage({
	params
}: {
	params: { category: string; sex: string; page: number };
}) {
	revalidatePath("/shop/[category]/[sex]/[page]", "page");
	const { category, sex, page } = params;

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
		<main className="flex-1 p-6">
			<h1 className="pl-6 text-4xl font-bold capitalize">
				{sex && (
					<>
						<span>{sex}</span>
						<i className="ri-circle-fill mx-2 align-middle text-[1rem]"></i>
					</>
				)}
				<span>{category}</span>
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
					{testF(query, category, sex, page)}
				</Suspense>
			</Grid>
			<Suspense>{testP(query, category, sex, page)}</Suspense>
		</main>
	);
}
