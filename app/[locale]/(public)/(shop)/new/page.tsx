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
import { GET_NEW_PRODUCTS } from "../../../../queries/shopPage";
import CategoryShowcase from "../../../../components/CategoryShowcase";

type CategoryKeys = keyof IntlMessages["categories"];

export async function generateMetadata({
	params: { locale }
}: {
	params: { category: CategoryKeys; locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "categories" });

	return {
		title: `New products | Ephonix`
	};
}

async function fetchProducts(locale: string) {
	const client = await createApolloClient();

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
		<>
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
		</>
	);
}

export default function newPage({
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
			<CategoryShowcase category="new" />
			<Grid
				width="auto"
				className="shadow-top grid-cols ro-1  gap-10 bg-[rgb(20,20,20)]  p-2 text-white md:grid-cols-2 lg:grid-cols-4 lg:p-6"
			>
				<Suspense
					fallback={
						<>
							{[...Array(24)].map((_, index) => (
								<SkeletonProductDisplay key={index} />
							))}
						</>
					}
				>
					{loadProducts(locale)}
				</Suspense>
			</Grid>
		</main>
	);
}
