"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cardReducer";
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../queries/productType";
import createApolloClient from "../../apollo-client";
import { GET_PRODUCT_ALLDATA } from "../queries/productPage";
import LoginButton from "./LoginButton";
import { useLocale, useTranslations } from "next-intl";

type BuyButtonsProps = {
	productId: string;
};

export default function BuyButton({ productId }: BuyButtonsProps) {
	const t = useTranslations("shop");
	const dispatch = useDispatch();
	const locale = useLocale();

	const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const product = await getProductData(locale);
		if (product) {
			const currProduct = product.products.data[0];
			dispatch(
				addToCart({
					id: currProduct.attributes.uuid,
					name: currProduct.attributes.name,
					desc: currProduct.attributes.desc,
					price: currProduct.attributes.salePrice
						? currProduct.attributes.salePrice
						: currProduct.attributes.price,
					onSale: currProduct.attributes.salePrice ? currProduct.attributes.salePrice : null,
					image: currProduct.attributes.images.data[0].attributes.url,
					quantity: 1
				})
			);
		}
	};

	const getProductData = async (locale: string) => {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_PRODUCT_ALLDATA,
				variables: {
					productId: productId,
					locale: locale
				}
			});

			return data;
		} catch {
			return null;
		}
	};

	return (
		<>
			<SignedIn>
				<button
					className="flex h-full items-center justify-center rounded-full bg-red-600 p-2 px-3 font-bold text-white hover:scale-105 hover:bg-red-500 lg:w-[80%] lg:p-3
"
					title={t("buyButtonText")}
					onClick={(e) => handleButtonClick(e)}
				>
					{t("buyButtonText")}
				</button>
			</SignedIn>
			<SignedOut>
				<LoginButton />
			</SignedOut>
		</>
	);
}
