"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cardReducer";
import { SignUpButton, SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResultSingle } from "../queries/productType";
import createApolloClient from "../../apollo-client";
import { GET_PRODUCT_ALLDATA } from "../queries/productPage";
import { Suspense } from "react";

type BuyButtonsProps = {
	productId: string;
};

export default function BuyButton({ productId }: BuyButtonsProps) {
	const dispatch = useDispatch();
	const client = createApolloClient();

	const getProductData = async () => {
		try {
			const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
				query: GET_PRODUCT_ALLDATA,
				variables: {
					productId: productId
				}
			});

			const currProduct = data.product.data;
			return (
				<button
					className="w-[10rem] bg-red-600 p-2 text-white
lg:h-full lg:w-full"
					onClick={() =>
						dispatch(
							addToCart({
								id: currProduct.id,
								name: currProduct.attributes.name,
								desc: currProduct.attributes.desc,
								price: currProduct.attributes.salePrice
									? currProduct.attributes.salePrice
									: currProduct.attributes.price,
								image: currProduct.attributes.images.data[0].attributes.url,
								quantity: 1
							})
						)
					}
				>
					DODAJ DO KOSZYKA
				</button>
			);
		} catch {
			return null;
		}
	};

	return (
		<>
			<SignedIn>
				<Suspense>{getProductData()}</Suspense>
			</SignedIn>
			<SignedOut>
				<div className="mt-6 flex w-full flex-col items-center justify-center gap-3">
					<p className="text-center font-bold lg:text-white">
						You must be logged in to add a product to the cart.
					</p>
					<SignUpButton>
						<button
							className="w-[10rem] bg-zinc-900 p-2 font-bold text-white
lg:h-full lg:w-full"
						>
							Login
						</button>
					</SignUpButton>
				</div>
			</SignedOut>
		</>
	);
}
