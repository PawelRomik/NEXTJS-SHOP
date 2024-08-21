import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../../../components/ProductDisplay";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { FiltersData, QueryResult } from "../../../../../queries/productType";
import { Metadata } from "next";
import Pagination from "../../../../../components/Pagination";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../../components/SkeletonProductDisplay";
import { gql } from "@apollo/client";
import ErrorText from "../../../../../components/ErrorText";
import { GET_FILTERS } from "../../../../../queries/filters";
import ProductFilters from "../../../../../components/ProductFilters";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type CategoryKeys = keyof IntlMessages["categories"];

export async function generateMetadata({
	params: { category, locale }
}: {
	params: { category: CategoryKeys; locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "categories" });

	return {
		title: `${t(category).split(" ")[0]} | Ephonix`
	};
}

async function fetchProducts(
	category: string,
	page: number,
	locale: string,
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
		query getProducts($category: String!, $page: Int!${tags ? ", $tags: [String]" : ""}, $locale: I18NLocaleCode!) {
			products(
				pagination: { page: $page, pageSize: 8 }
				sort: "${getSortOrder(sort)}"
				filters: { categories: { slug: { eq: $category } }${tags ? ", tags: { name: { in: $tags } } " : ""} }
				locale: $locale
			) {
				data {
					id
					attributes {
						name
						price
						desc
						uuid
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
			page: Number(page),
			locale: locale
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

async function loadProducts(
	category: string,
	page: number,
	locale: string,
	tags?: string[],
	sort?: string
) {
	const data = await fetchProducts(category, page, locale, tags, sort);
	if (!data) return <ErrorText />;

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

async function loadPagination(category: string, page: number, locale: string, tags?: string[]) {
	const data = await fetchProducts(category, page, locale, tags);
	if (!data) return null;

	return (
		<Pagination currentPage={Number(page)} pagesCount={Number(data.meta.pagination.pageCount)} />
	);
}

async function LoadFilters(category: string, locale: string) {
	try {
		const client = createApolloClient();
		const { data }: ApolloQueryResult<FiltersData> = await client.query({
			query: GET_FILTERS,
			variables: {
				category: category,
				locale: locale
			}
		});

		if (!data) return null;

		const filters = data.filters.data;
		return <ProductFilters filters={filters} />;
	} catch {
		return null;
	}
}

export default function ShopPage({
	params: { category, locale },
	searchParams
}: {
	params: {
		category: CategoryKeys;
		locale: string;
	};
	searchParams?: {
		page?: number;
		tags?: string;
		sort?: string;
	};
}) {
	revalidatePath("/[locale]/category/[category]", "page");
	const page = searchParams?.page || 1;
	const tagsFromUrl = searchParams?.tags;
	const tags = tagsFromUrl ? tagsFromUrl.split(",") : undefined;
	const sort = searchParams?.sort || "latest";
	const t = useTranslations("categories");

	return (
		<main className=" w-full bg-zinc-950 p-6">
			<h1 className="flex items-center justify-center text-4xl font-bold capitalize text-red-600 lg:justify-start lg:pl-6">
				<span>{`${t(category).split(" ")[0]}`}</span>
			</h1>
			<Suspense>{LoadFilters(category, locale)}</Suspense>
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
					{loadProducts(category, page, locale, tags, sort)}
				</Suspense>
			</Grid>
			<Suspense>{loadPagination(category, page, locale, tags)}</Suspense>
		</main>
	);
}
