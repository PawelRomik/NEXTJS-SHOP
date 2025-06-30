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
				<div className="flex w-full flex-col gap-5">
					<div className="flex w-full flex-col items-center lg:items-end">
						<h1 className="py-3 text-2xl font-bold lg:text-4xl">{currProduct.name}</h1>
						<div className="w-full border-[5px] border-transparent border-t-red-600 "></div>
						<div className="w-[90%] border-[3px] border-transparent border-t-red-700"></div>
						<h2 className="uppercase text-red-600">{t(category)}</h2>
					</div>
					<p className="mt-auto text-center lg:text-left">{extractText(currProduct.desc)}</p>
				</div>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getProductDesc()}</Suspense>;
}
