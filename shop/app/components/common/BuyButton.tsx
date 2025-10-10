"use client";

import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cardReducer";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../../queries/productType";
import { getApolloClient } from "../../../apollo-client";
import { GET_PRODUCT_ALLDATA } from "../../queries/productPage";
import LoginButton from "../auth/LoginButton";
import { useLocale, useTranslations } from "next-intl";

type BuyButtonsProps = {
	productId: string;
};

async function fetchProductData(productId: string, locale: string): Promise<QueryResult | null> {
	try {
		const client = await getApolloClient();
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_PRODUCT_ALLDATA,
			variables: { productId, locale }
		});
		return data;
	} catch {
		return null;
	}
}

export default function BuyButton({ productId }: BuyButtonsProps) {
	const t = useTranslations("shop");
	const locale = useLocale();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	const handleButtonClick = useCallback(
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			e.stopPropagation();

			setLoading(true);
			try {
				const product = await fetchProductData(productId, locale);
				const currProduct = product?.products?.data?.[0];
				if (!currProduct) return;

				dispatch(
					addToCart({
						id: currProduct.attributes.uuid,
						quantity: 1
					})
				);
			} finally {
				setLoading(false);
			}
		},
		[dispatch, locale, productId]
	);

	return (
		<>
			<SignedIn>
				<button
					className="ignore-popover-close flex h-full items-center justify-center rounded-full bg-red-600 p-2 px-3 font-bold text-white hover:scale-105 hover:bg-red-500 lg:w-[80%] lg:p-3"
					title={t("buyButtonText")}
					onClick={handleButtonClick}
					disabled={loading}
				>
					{loading ? "loading" : t("buyButtonText")}
				</button>
			</SignedIn>
			<SignedOut>
				<LoginButton />
			</SignedOut>
		</>
	);
}
