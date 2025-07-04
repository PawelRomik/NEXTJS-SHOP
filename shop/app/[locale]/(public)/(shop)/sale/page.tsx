import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import createApolloClient from "../../../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../../../../queries/productType";
import ErrorText from "../../../../components/ErrorText";
import ProductDisplay from "../../../../components/ProductDisplay";
import { revalidatePath } from "next/cache";
import { Grid } from "@radix-ui/themes";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../components/SkeletonProductDisplay";
import { GET_SALE_PRODUCTS } from "../../../../queries/shopPage";
import CategoryShowcase from "../../../../components/CategoryShowcase";
import Pagination from "../../../../components/Pagination";

type CategoryKeys = keyof IntlMessages["categories"];

export async function generateMetadata({
	params: { locale }
}: {
	params: { category: CategoryKeys; locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "categories" });

	return {
		title: `${t("sale")} | Ephonix`
	};
}

async function fetchProducts(page: number, locale: string) {
	const client = await createApolloClient();

	try {
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_SALE_PRODUCTS,
			variables: {
				locale: locale,
				page: Number(page)
			}
		});

		return data.products;
	} catch {
		return null;
	}
}

async function loadProducts(page: number, locale: string) {
	const data = await fetchProducts(page, locale);
	if (!data || data.data.length == 0) return <ErrorText />;

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
					imageUrl={`${product.attributes.images.data[0].attributes.url}`}
					key={product.id}
				></ProductDisplay>
			))}
		</Grid>
	);
}

async function loadPagination(page: number, locale: string) {
	const data = await fetchProducts(page, locale);
	if (!data) return null;

	return (
		<Pagination currentPage={Number(page)} pagesCount={Number(data.meta.pagination.pageCount)} />
	);
}

export default function SalePage({
	params: { locale },
	searchParams
}: {
	params: {
		category: CategoryKeys;
		locale: string;
	};
	searchParams?: {
		page?: number;
	};
}) {
	revalidatePath("/[locale]/new", "page");
	const page = searchParams?.page || 1;

	return (
		<main className=" w-full bg-[rgb(20,20,20)]">
			<CategoryShowcase locale={locale} category="sale" />

			<Suspense fallback={<SkeletonProductDisplay />}>{loadProducts(page, locale)}</Suspense>
			<Suspense>{loadPagination(page, locale)}</Suspense>
		</main>
	);
}
