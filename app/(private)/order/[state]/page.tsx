import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import Link from "next/link";
import ProductDisplay from "../../../components/ProductDisplay";
import createApolloClient from "../../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../../../queries/productType";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../components/SkeletonProductDisplay";
import { GET_NEW_PRODUCTS_ORDER } from "../../../queries/order";

export const metadata: Metadata = {
	title: "N3XT | Order Status"
};

async function fetchProducts() {
	const client = createApolloClient();
	try {
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_NEW_PRODUCTS_ORDER,
			variables: {
				sex: ["male", "female"]
			}
		});

		return data.products;
	} catch {
		return null;
	}
}

async function loadProducts() {
	const data = await fetchProducts();
	if (!data) return null;

	return (
		<>
			<h2 className="col-span-4 row-auto mt-6 w-full pb-4 text-3xl font-bold text-zinc-400">
				Check other products!
			</h2>
			<div className=" w-full overflow-hidden lg:flex-1">
				<div className="flex max-w-[100%] gap-6 overflow-x-auto">
					{data.data.map((product) => (
						<ProductDisplay
							id={product.id}
							name={product.attributes.name}
							desc={product.attributes.desc}
							price={product.attributes.price}
							salePrice={product.attributes.salePrice}
							category={product.attributes.categories.data[1].attributes.name}
							imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.images.data[0].attributes.url}`}
							key={product.id}
						></ProductDisplay>
					))}
				</div>
			</div>
		</>
	);
}

export default async function OrderPage({ params }: { params: { state: string } }) {
	revalidatePath("/order/[state]", "page");

	const { state } = params;

	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-6">
			<p className="col-span-4 row-auto mt-6 w-full text-center text-3xl font-bold text-zinc-400">
				<i className="ri-error-warning-line"></i>
				{state === "success"
					? "Your order has been successfully processed."
					: "An error occurred while placing order, please try again later."}
			</p>
			<Link href="/" title="Home">
				<button className="rounded-full bg-zinc-950 px-10 py-4 text-white">Home</button>
			</Link>
			<div className="flex w-[80%] flex-col items-center justify-center">
				<Suspense
					fallback={
						<>
							{[...Array(5)].map((_, index) => (
								<SkeletonProductDisplay key={index} />
							))}
						</>
					}
				>
					{loadProducts()}
				</Suspense>
			</div>
		</div>
	);
}
