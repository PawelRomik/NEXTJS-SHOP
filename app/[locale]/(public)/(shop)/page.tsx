import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../components/ProductDisplay";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { GET_PRODUCTS } from "../../../queries/allPage";
import { QueryResult } from "../../../queries/productType";
import SkeletonProductDisplay from "../../../components/SkeletonProductDisplay";
import { Metadata } from "next";
import { Suspense } from "react";
import ErrorText from "../../../components/ErrorText";
import CategorySection from "../../../components/CategorySection";

export const metadata: Metadata = {
	title: "Ephonix"
};

async function fetchProducts(locale: string) {
	try {
		const client = await createApolloClient();

		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_PRODUCTS,
			variables: {
				locale: locale
			}
		});
		console.log(data);

		return data.products;
	} catch (err) {
		console.log(err);
		return null;
	}
}

async function loadProducts(locale: string) {
	const data = await fetchProducts(locale);

	if (!data) return <ErrorText />;

	return (
		<>
			{data.data.map((product) => (
				<ProductDisplay
					uuid={product.attributes.uuid}
					desc={product.attributes.desc}
					name={product.attributes.name}
					price={product.attributes.price}
					salePrice={product.attributes.salePrice}
					category={product.attributes.categories.data[0].attributes.name}
					imageUrl={product.attributes.images.data[0].attributes.url}
					key={product.id}
				></ProductDisplay>
			))}
		</>
	);
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
	revalidatePath("/[locale]/", "page");

	return (
		<main className=" w-full bg-black px-5">
			<CategorySection locale={locale} category="processor"></CategorySection>
			<CategorySection locale={locale} category="processor"></CategorySection>
			<CategorySection locale={locale} category="processor"></CategorySection>
		</main>
	);
}
