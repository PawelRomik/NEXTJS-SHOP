import { GET_PRODUCT_PRICE } from "../queries/productPage";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../queries/productType";
import { Suspense } from "react";
import createApolloClient from "../../apollo-client";
import BuyButton from "./BuyButton";
import { useTranslations } from "next-intl";

type ProductShowcasePriceProps = {
	productId: string;
	locale: string;
};

export default function ProductShowcasePrice({ productId, locale }: ProductShowcasePriceProps) {
	const t = useTranslations("product");
	async function getProductPrice() {
		try {
			const client = createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_PRODUCT_PRICE,
				variables: {
					productId: productId,
					locale: locale
				}
			});

			const currProduct = data.products.data[0].attributes;
			return (
				<div className="mr-4 flex flex-col items-end justify-center gap-3 lg:items-start">
					<p className="text-3xl font-bold">{t("price", { amount: currProduct.price })}</p>
					<BuyButton productId={productId} />
				</div>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getProductPrice()}</Suspense>;
}
