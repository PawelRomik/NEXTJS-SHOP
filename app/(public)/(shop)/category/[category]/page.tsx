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
import ProductFIlters from "../../../../components/ProductFilters";
import { gql } from "@apollo/client";

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

async function fetchProducts(
	category: string,
	page: number,
	tags?: string[],
	sort: string = "latest"
) {
	const client = createApolloClient();

	const getSortOrder = (sortKey: string) => {
		switch (sortKey) {
			case "latest":
				return "createdAt:desc";
			case "priceLow":
				return "price:asc";
			case "priceHigh":
				return "price:desc";
			case "nameStart":
				return "name:asc";
			case "nameEnd":
				return "name:desc";
			default:
				return "createdAt:desc";
		}
	};

	const newQuery = `
		query getProducts($category: String!, $page: Int!${tags ? ", $tags: [String]" : ""}) {
			products(
				pagination: { page: $page, pageSize: 8 }
				sort: "${getSortOrder(sort)}"
				filters: { categories: { slug: { eq: $category } }${tags ? ", tags: { name: { in: $tags } } " : ""} }
				locale: "pl"
			) {
				data {
					id
					attributes {
						name
						price
						desc
						salePrice
						images {
							data {
								attributes {
									url
								}
							}
						}
						categories {
							data {
								attributes {
									name
								}
							}
						}
					}
				}
				meta {
					pagination {
						pageCount
					}
				}
			}
		}
	`;

	try {
		const variables: Record<string, any> = {
			category,
			page: Number(page)
		};

		if (tags) {
			variables.tags = tags;
		}

		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: gql(newQuery),
			variables
		});

		return data.products;
	} catch {
		return null;
	}
}

async function loadProducts(category: string, page: number, tags?: string[], sort?: string) {
	const data = await fetchProducts(category, page, tags, sort);
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

async function loadPagination(category: string, page: number, tags?: string[]) {
	const data = await fetchProducts(category, page, tags);
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
		tags?: string;
		sort?: string;
	};
}) {
	revalidatePath("/category/[category]", "page");
	const { category } = params;
	const page = searchParams?.page || 1;
	const tagsFromUrl = searchParams?.tags;
	const tags = tagsFromUrl ? tagsFromUrl.split(",") : undefined;
	const sort = searchParams?.sort || "latest";

	return (
		<main className=" w-full bg-zinc-950 p-6">
			<h1 className="flex items-center justify-center text-4xl font-bold capitalize text-red-600 lg:justify-start lg:pl-6">
				<span>{category + "s"}</span>
			</h1>
			<ProductFIlters />
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
					{loadProducts(category, page, tags, sort)}
				</Suspense>
			</Grid>
			<Suspense>{loadPagination(category, page, tags)}</Suspense>
		</main>
	);
}
