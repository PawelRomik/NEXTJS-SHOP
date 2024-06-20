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
	title: "N3XT | All"
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

export default async function HomePage() {
	revalidatePath("/");

	return (
		<main className="flex-1 p-6	">
			<h1 className="pl-6 text-4xl font-bold capitalize">All</h1>
			<Grid
				gap="4"
				width="auto"
				className="h-full grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-4 lg:p-6"
			>
				<Suspense
					fallback={
						<p className="col-span-4 row-auto w-full text-center text-3xl font-bold text-zinc-400">
							<i className="ri-error-warning-line"></i> Loading products, please wait.
						</p>
					}
				>
					{loadProducts()}
				</Suspense>
			</Grid>
		</main>
	);
}
