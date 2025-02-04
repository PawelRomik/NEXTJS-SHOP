import { GET_PRODUCT_DESC } from "../queries/productPage";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../queries/productType";
import { Suspense } from "react";
import createApolloClient from "../../apollo-client";
import { useTranslations } from "next-intl";

type ProductShowcaseDescProps = {
	productId: string;
	locale: string;
};

export default function ProductShowcaseDesc({ productId, locale }: ProductShowcaseDescProps) {
	const t = useTranslations("categories");
	const extractText = (text: string) => {
		const startIndex = text.indexOf("--START--") + "--START--".length;
		const endIndex = text.indexOf(".");
		return text.slice(startIndex, endIndex).trim() + ".";
	};

	async function getProductDesc() {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_PRODUCT_DESC,
				variables: {
					productId: productId,
					locale: locale
				}
			});

			const currProduct = data.products.data[0].attributes;
			const category = currProduct.categories.data[0].attributes.slug;
			return (
				<div className="flex flex-col gap-3">
					<h1 className="text-4xl font-bold uppercase">{currProduct.name}</h1>
					<h2 className="uppercase text-red-600">{t(category)}</h2>
					<p>{extractText(currProduct.desc)}</p>
				</div>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getProductDesc()}</Suspense>;
}
