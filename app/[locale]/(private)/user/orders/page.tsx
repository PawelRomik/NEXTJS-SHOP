import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { GET_ORDER_HISTORY } from "../../../../queries/order";
import { OrderHistoryData } from "../../../../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import ErrorText from "../../../../components/ErrorText";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	//const t = await getTranslations({ locale, namespace: "settings" });

	return {
		title: `Order History | Ephonix`
	};
}

async function fetchProducts() {
	try {
		const user = await currentUser();
		console.log(user?.id);
		const client = createApolloClient();
		const { data }: ApolloQueryResult<OrderHistoryData> = await client.query({
			query: GET_ORDER_HISTORY,
			variables: {
				user: user?.id,
				page: 1
			}
		});

		return data.orders;
	} catch (err) {
		console.log(err);
	}
}

async function loadProducts() {
	const data = await fetchProducts();
	console.log(data);
	if (!data) return <ErrorText />;

	return (
		<>
			{data.data.map((product) => (
				<tr
					key={product.id}
					className="flex h-[80px] w-full items-center justify-between border-2 border-black bg-zinc-900 p-3 text-2xl  text-white"
				>
					<td className="">#{product.id}</td>
					<td>{product.attributes.createdAt}</td>
					<td>
						<button className="border-2 border-black bg-zinc-950 p-2">Check</button>
					</td>
				</tr>
			))}
		</>
	);
}

export default function ProductPage({
	params: { locale, productId }
}: {
	params: { productId: string; locale: string };
}) {
	revalidatePath("/[locale]/user/orders", "page");

	return (
		<main className=" flex w-full flex-1 flex-col gap-3 bg-zinc-950 p-5">
			<h1 className="text-3xl font-bold uppercase text-white">Order History</h1>
			<table className="flex h-[700px] flex-grow-0 flex-col flex-wrap items-start justify-start gap-3 overflow-y-auto ">
				<Suspense fallback={<p>Loading</p>}>{loadProducts()}</Suspense>
			</table>
		</main>
	);
}
