import { GET_PRODUCT_DESC } from "../queries/productPage";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult, QueryResultSingle } from "../queries/productType";
import { Suspense } from "react";
import createApolloClient from "../../apollo-client";

type ProductShowcaseDescProps = {
	productId: string;
	locale: string;
};

export default function ProductShowcaseDesc({ productId, locale }: ProductShowcaseDescProps) {
	const extractText = (text: string) => {
		const startIndex = text.indexOf("--START--") + "--START--".length;
		const endIndex = text.indexOf(".");
		return text.slice(startIndex, endIndex).trim() + ".";
	};

	async function getProductDesc() {
		try {
			const client = createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_PRODUCT_DESC,
				variables: {
					productId: productId,
					locale: locale
				}
			});

			const currProduct = data.products.data[0].attributes;
			return (
				<div className="flex flex-col gap-3">
					<h1 className="text-4xl font-bold uppercase">{currProduct.name}</h1>
					<h2 className="uppercase text-red-600">
						{currProduct.categories.data[0].attributes.name}
					</h2>
					<p>{extractText(currProduct.desc)}</p>
				</div>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getProductDesc()}</Suspense>;
}
