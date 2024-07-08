import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../components/ProductDisplay";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../apollo-client";
import { revalidatePath } from "next/cache";
import { GET_PRODUCTS } from "../../queries/allPage";
import { QueryResult } from "../../queries/productType";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Ephonix"
};

async function fetchProducts() {
	const client = createApolloClient();
	try {
		const { data }: ApolloQueryResult<QueryResult> = await client.query({ query: GET_PRODUCTS });

		return data.products;
	} catch {
		return null;
	}
}

async function loadProducts() {
	const data = await fetchProducts();
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
					price={product.attributes.price}
					salePrice={product.attributes.salePrice}
					category={product.attributes.categories.data[1].attributes.name}
					imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.images.data[0].attributes.url}`}
					key={product.id}
				></ProductDisplay>
			))}
		</>
	);
}

export default async function HomePage() {
	revalidatePath("/");

	return <main className=" w-full bg-black p-6"></main>;
}
