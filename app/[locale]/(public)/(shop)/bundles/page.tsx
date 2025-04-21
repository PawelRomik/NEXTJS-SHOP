import { Grid } from "@radix-ui/themes";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { BundlesResult } from "../../../../queries/productType";
import { Metadata } from "next";
import Pagination from "../../../../components/Pagination";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../components/SkeletonProductDisplay";
import ErrorText from "../../../../components/ErrorText";
import { getTranslations } from "next-intl/server";
import CategoryShowcase from "../../../../components/CategoryShowcase";
import { GET_BUNDLES } from "../../../../queries/bundles";
import BundleDisplay from "../../../../components/BundleDisplay";

export async function generateMetadata({
	params: { locale }
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "categories" });

	return {
		title: `${t("bundles")} | Ephonix`
	};
}

async function fetchProducts(page: number, locale: string) {
	const client = await createApolloClient();
	try {
		const { data }: ApolloQueryResult<BundlesResult> = await client.query({
			query: GET_BUNDLES,
			variables: {
				page: Number(page),
				locale: locale
			}
		});
		return data.bundles;
	} catch {
		return null;
	}
}

async function loadProducts(page: number, locale: string) {
	const data = await fetchProducts(page, locale);
	if (!data || data.data.length == 0) return <ErrorText />;

	return (
		<>
			{data.data.map((bundle) => (
				<BundleDisplay
					key={bundle.id}
					display={bundle.attributes.display.data.attributes.url}
					name={bundle.attributes.name}
					price={bundle.attributes.price}
					products={bundle.attributes.products}
				/>
			))}
		</>
	);
}

async function loadPagination(page: number, locale: string) {
	const data = await fetchProducts(page, locale);
	if (!data) return null;

	return (
		<Pagination currentPage={Number(page)} pagesCount={Number(data.meta.pagination.pageCount)} />
	);
}

export default function BundlePage({
	params: { locale },
	searchParams
}: {
	params: {
		locale: string;
	};
	searchParams?: {
		page?: number;
	};
}) {
	revalidatePath("/[locale]/bundle", "page");
	const page = searchParams?.page || 1;

	return (
		<main className=" w-full bg-[rgb(20,20,20)]">
			<CategoryShowcase category={"bundles"} />
			<div className="relative z-[20] min-h-[50px] w-full overflow-hidden bg-[rgb(11,11,11)] bg-[size:60%_100%]  bg-center "></div>
			<Grid
				width="auto"
				className="shadow-top grid-cols bg-[rgb(20,20,20)] p-2 text-white md:grid-cols-2 lg:grid-cols-4 lg:gap-[8%] lg:px-[8%] lg:py-12"
			>
				<Suspense
					fallback={
						<>
							{[...Array(8)].map((_, index) => (
								<SkeletonProductDisplay key={index} />
							))}
						</>
					}
				>
					{loadProducts(page, locale)}
					{loadProducts(page, locale)}
					{loadProducts(page, locale)}
					{loadProducts(page, locale)}
				</Suspense>
			</Grid>
			<Suspense>{loadPagination(page, locale)}</Suspense>
		</main>
	);
}
