"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cardReducer";
import { SignUpButton, SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";

type BuyButtonsProps = {
	currProductProp: any;
};

export default function BuyButton({ currProductProp }: BuyButtonsProps) {
	const dispatch = useDispatch();

	return (
		<>
			<SignedIn>
				<button
					className="w-[10rem] bg-red-600 p-2 text-white
lg:h-full lg:w-full"
					onClick={() =>
						dispatch(
							addToCart({
								id: currProductProp.id,
								name: currProductProp.attributes.name,
								desc: currProductProp.attributes.desc,
								price: currProductProp.attributes.salePrice
									? currProductProp.attributes.salePrice
									: currProductProp.attributes.price,
								image: currProductProp.attributes.image.data.attributes.url,
								quantity: 1
							})
						)
					}
				>
					DODAJ DO KOSZYKA
				</button>
			</SignedIn>
			<SignedOut>
				<div className="mt-6 flex w-full flex-col items-center justify-center gap-3">
					<p className="text-center font-bold lg:text-white">
						You must be logged in to add a product to the cart.
					</p>
					<SignUpButton>
						<button className="w-[10rem] rounded-full bg-black p-4 text-white lg:h-full lg:w-full">
							Login
						</button>
					</SignUpButton>
				</div>
			</SignedOut>
		</>
	);
}
