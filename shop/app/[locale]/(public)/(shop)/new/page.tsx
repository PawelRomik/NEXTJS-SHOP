import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getApolloClient } from "../../../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../../../../queries/productType";
import ErrorText from "../../../../components/common/ErrorText";
import ProductDisplay from "../../../../components/common/ProductDisplay";
import { revalidatePath } from "next/cache";
import { Grid } from "@radix-ui/themes";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../../components/common/SkeletonProductDisplay";
import { GET_NEW_PRODUCTS } from "../../../../queries/shopPage";
import CategoryShowcase from "../../../../components/category-showcase/CategoryShowcase";

type CategoryKeys = keyof IntlMessages["categories"];

export async function generateMetadata({
	params: { locale }
}: {
	params: { category: CategoryKeys; locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "categories" });

	return {
		title: `${t("new")} | Ephonix`
	};
}

async function fetchProducts(locale: string) {
	const client = await getApolloClient();

	try {
		const variables: Record<string, any> = {
			locale: locale
		};

		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_NEW_PRODUCTS,
			variables
		});

		return data.products;
	} catch {
		return null;
	}
}

async function loadProducts(locale: string) {
	const data = await fetchProducts(locale);
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

export default function NewPage({
	params: { locale }
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
	revalidatePath("/[locale]/new", "page");

	return (
		<main className=" w-full bg-[rgb(20,20,20)]">
			<CategoryShowcase locale={locale} category="new" />

			<Suspense fallback={<SkeletonProductDisplay />}>{loadProducts(locale)}</Suspense>
		</main>
	);
}
