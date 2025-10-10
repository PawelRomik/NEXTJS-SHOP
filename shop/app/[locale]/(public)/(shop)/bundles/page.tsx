import { Grid } from "@radix-ui/themes";
import { ApolloQueryResult } from "@apollo/client";
import { getApolloClient } from "../../../../../apollo-client";
import { BundlesResult } from "../../../../queries/productType";
import { Metadata } from "next";
import Pagination from "../../../../components/common/Pagination";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../components/SkeletonProductDisplay";
import ErrorText from "../../../../components/common/ErrorText";
import { getTranslations } from "next-intl/server";
import CategoryShowcase from "../../../../components/CategoryShowcase";
import { GET_BUNDLES } from "../../../../queries/bundles";
import BundleDisplay from "../../../../components/bundles-section/BundleDisplay";

export async function generateMetadata({
	params: { locale }
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "categories" });
	return { title: `${t("bundles")} | Ephonix` };
}

async function fetchProducts(page: number, locale: string) {
	const client = await getApolloClient();
	try {
		const { data }: ApolloQueryResult<BundlesResult> = await client.query({
			query: GET_BUNDLES,
			variables: { page: Number(page), locale }
		});
		return data.bundles;
	} catch {
		return null;
	}
}

async function ProductsList({ page, locale }: { page: number; locale: string }) {
	const data = await fetchProducts(page, locale);
	if (!data || data.data.length === 0) return <ErrorText />;

	return (
		<>
			{data.data.map((bundle) => (
				<BundleDisplay
					key={bundle.id}
					uuid={bundle.id}
					display={bundle.attributes.display.data.attributes.url}
					name={bundle.attributes.name}
					price={bundle.attributes.price}
					products={bundle.attributes.products}
				/>
			))}
		</>
	);
}

async function PaginationWrapper({ page, locale }: { page: number; locale: string }) {
	const data = await fetchProducts(page, locale);
	if (!data) return null;

	return (
		<Pagination currentPage={Number(page)} pagesCount={Number(data.meta.pagination.pageCount)} />
	);
}

function ProductSkeletonGrid() {
	return (
		<>
			{[...Array(8)].map((_, i) => (
				<SkeletonProductDisplay key={i} />
			))}
		</>
	);
}

export default async function BundlePage({
	params: { locale },
	searchParams
}: {
	params: { locale: string };
	searchParams?: { page?: number };
}) {
	const page = Number(searchParams?.page || 1);

	return (
		<main className="w-full bg-[rgb(20,20,20)]">
			<CategoryShowcase locale={locale} category="bundles" />
			<div className="relative z-[20] min-h-[50px] w-full overflow-hidden bg-[rgb(11,11,11)] bg-[size:60%_100%] bg-center" />
			<Grid
				width="auto"
				className="shadow-top grid-cols-1 gap-10 bg-[rgb(20,20,20)] p-2 text-white md:grid-cols-2 lg:grid-cols-4 lg:p-6"
			>
				<Suspense fallback={<ProductSkeletonGrid />}>
					<ProductsList page={page} locale={locale} />
				</Suspense>
			</Grid>
			<Suspense>
				<PaginationWrapper page={page} locale={locale} />
			</Suspense>
		</main>
	);
}
