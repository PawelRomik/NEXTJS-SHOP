"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cardReducer";
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResultSingle } from "../queries/productType";
import createApolloClient from "../../apollo-client";
import { GET_PRODUCT_ALLDATA } from "../queries/productPage";
import { Suspense } from "react";
import { useTranslation } from "next-i18next";
import LoginButton from "./LoginButton";

type BuyButtonsProps = {
	productId: string;
};

export default function BuyButton({ productId }: BuyButtonsProps) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const client = createApolloClient();

	const handleButtonClick = async (productId: string, e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const product = await getProductData();
		if (product) {
			const currProduct = product.product.data;
			dispatch(
				addToCart({
					id: currProduct.id,
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

	const getProductData = async () => {
		try {
			const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
				query: GET_PRODUCT_ALLDATA,
				variables: {
					productId: productId
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
					className="flex h-full w-full items-center justify-center bg-red-600 p-2 text-white hover:scale-105 hover:bg-red-500
"
					title={t("shop:buyButtonText")}
					onClick={(e) => handleButtonClick(productId, e)}
				>
					{t("shop:buyButtonText")}
				</button>
			</SignedIn>
			<SignedOut>
				<LoginButton />
			</SignedOut>
		</>
	);
}
