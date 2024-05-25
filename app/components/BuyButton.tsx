"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cardReducer";

type BuyButtonsProps = {
	currProductProp: any;
};

export default function BuyButton({ currProductProp }: BuyButtonsProps) {
	const dispatch = useDispatch();

	return (
		<button
			className="w-[10rem] rounded-full bg-black p-4 text-white
lg:h-full lg:w-full"
			onClick={() =>
				dispatch(
					addToCart({
						id: currProductProp.id,
						name: currProductProp.attributes.name,
						desc: currProductProp.attributes.desc,
						price: currProductProp.attributes.price,
						image: currProductProp.attributes.image.data.attributes.url,
						quantity: 1
					})
				)
			}
		>
			BUY
		</button>
	);
}
