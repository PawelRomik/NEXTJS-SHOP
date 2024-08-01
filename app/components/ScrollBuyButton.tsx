"use client";
import React, { useState, useEffect, Suspense } from "react";
import BuyButton from "./BuyButton";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResultSingle } from "../queries/productType";
import { GET_PRODUCT_PRICE } from "../queries/productPage";
import createApolloClient from "../../apollo-client";

type BuyButtonsProps = {
	productId: string;
};

export default function ScrollBuyButton({ productId }: BuyButtonsProps) {
	const client = createApolloClient();
	const [isVisible, setIsVisible] = useState(false);

	async function getProductPrice() {
		const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
			query: GET_PRODUCT_PRICE,
			variables: {
				productId: productId
			}
		});

		const currProduct = data.product.data.attributes;
		return (
			<p className=" w-full text-xl font-bold lg:text-3xl">
				PLN {currProduct.salePrice ? currProduct.salePrice : currProduct.price}
			</p>
		);
	}

	useEffect(() => {
		const handleScroll = () => {
			const othersElement = document.getElementById("others");
			if (!othersElement) return;

			if (window.scrollY > 200 && window.scrollY < othersElement.offsetTop - window.innerHeight) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={`fixed bottom-0 z-10 h-20 w-full bg-[rgb(0,0,0,0.8)] transition  ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<div className="absolute flex  h-full w-full items-center justify-center gap-3 text-white lg:right-[6rem] lg:w-auto">
				<div className="flex  h-full w-full items-center justify-between px-[5rem] lg:w-[500px]">
					<Suspense>{getProductPrice()}</Suspense>
					<div className="h-full w-[20rem] p-3 lg:w-[30rem]">
						<BuyButton productId={productId} />
					</div>
				</div>
			</div>
		</div>
	);
}
