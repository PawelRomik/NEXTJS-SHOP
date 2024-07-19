import { GET_PRODUCT_DESC } from "../queries/productPage";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResultSingle } from "../queries/productType";
import { Suspense } from "react";
import createApolloClient from "../../apollo-client";

type ProductShowcaseDescProps = {
	productId: string;
};

export default function ProductShowcaseDesc({ productId }: ProductShowcaseDescProps) {
	const client = createApolloClient();

	const extractText = (text: string) => {
		const startIndex = text.indexOf("--START--") + "--START--".length;
		const endIndex = text.indexOf(".");
		return text.slice(startIndex, endIndex).trim() + ".";
	};

	async function getProductDesc() {
		const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
			query: GET_PRODUCT_DESC,
			variables: {
				productId: productId
			}
		});

		const currProduct = data.product.data.attributes;
		return (
			<div className="flex flex-col gap-3">
				<h1 className="text-4xl font-bold uppercase">{currProduct.name}</h1>
				<h2 className="uppercase text-red-600">{currProduct.categories.data[0].attributes.name}</h2>
				<p>{extractText(currProduct.desc)}</p>
			</div>
		);
	}

	return <Suspense>{getProductDesc()}</Suspense>;
}
