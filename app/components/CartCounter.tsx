"use client";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cardReducer";
import createApolloClient from "../../apollo-client";
import { QueryResult } from "../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import { GET_PRODUCT_ALLDATA } from "../queries/productPage";

function CartCounter({ productId }: { productId: string }) {
	const [cartValue, setCartValue] = useState(1);
	const t = useTranslations();
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
					quantity: cartValue
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

	const handleAddToCart = (type: boolean) => {
		if (!type) {
			cartValue > 1 && setCartValue(cartValue - 1);
		} else {
			cartValue < 99 && setCartValue(cartValue + 1);
		}
	};

	const changeCartCount = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = parseInt(e.target.value, 10);
		if (isNaN(newValue)) return;
		if (newValue > 99) {
			setCartValue(99);
		} else if (newValue < 1) {
			setCartValue(1);
		} else {
			setCartValue(newValue);
		}
	};

	return (
		<div className="mr-2 flex h-full items-end justify-center gap-3">
			<div className="flex h-[2rem] w-[4.5rem] items-center justify-center">
				<button
					onClick={(e) => handleAddToCart(false)}
					className="flex h-full w-1/4 items-center  justify-center rounded-l-lg bg-red-600 text-white hover:scale-105 hover:bg-red-500 "
				>
					<i className="ri-subtract-line"></i>
				</button>
				<input
					type="number"
					min={1}
					max={99}
					value={cartValue}
					onChange={(e) => changeCartCount(e)}
					className=" removeArrowInput h-full w-1/2 bg-red-800 text-center font-bold  text-white"
				></input>
				<button
					onClick={(e) => handleAddToCart(true)}
					className=" flex h-full w-1/4  items-center justify-center rounded-r-lg bg-red-600 text-white hover:scale-105 hover:bg-red-500 "
				>
					<i className="ri-add-line"></i>
				</button>
			</div>

			<button
				title={t("shop.buyButtonText")}
				onClick={handleButtonClick}
				className=" h-[2rem] w-[2rem] rounded-lg bg-red-600 text-white hover:scale-105 hover:bg-red-500 "
			>
				<i className="ri-shopping-cart-2-line "></i>
			</button>
		</div>
	);
}

export default CartCounter;
