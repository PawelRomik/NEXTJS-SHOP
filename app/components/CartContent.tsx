"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { removeItem, increaseQuantity, resetCart, removeAllOfItem } from "../redux/cardReducer";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "../lib/utils/formatPrice";
import { useCurrency } from "../context/CurrencyProvider";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Link from "next/link";

type RootState = {
	cart: {
		products: any[];
		count: number;
	};
};

type inputData = {
	discount: string;
};

export default function CartContent() {
	const t = useTranslations();
	const products = useSelector((state: RootState) => state.cart.products);
	const count = useSelector((state: RootState) => state.cart.count);
	const [discount, setDiscount] = useState(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [discountMessage, setDiscountMessage] = useState(false);
	const [price, setPrice] = useState<number | string>(0);
	const [oldPrice, setOldPrice] = useState<number | string>(0);
	const [formData, setFormData] = useState<inputData>({
		discount: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const dispatch = useDispatch();
	const { exchangeRate, currency } = useCurrency();
	const locale = useLocale();
	const { user } = useUser();

	useEffect(() => {
		let total = 0;
		products.forEach((item) => {
			total += item.quantity * parseFloat(formatPrice(item.price, exchangeRate));
		});
		setOldPrice(total.toFixed(2));
		total = total - (total * discount) / 100;
		setPrice(total.toFixed(2));
	}, [products, discount, exchangeRate]);

	const prevTotalQuantity = useRef(products.reduce((sum, item) => sum + item.quantity, 0));

	useEffect(() => {
		const currentTotalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);

		prevTotalQuantity.current = currentTotalQuantity;
	}, [products]);

	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PROD_KEY || "");

	const addCode = () => {
		setDiscountMessage(false);
		if (formData.discount == "Rabat123") {
			setDiscount(30);
		}
		setDiscountMessage(true);
	};

	const handlePayment = async () => {
		try {
			const stripe = await stripePromise;
			const res = await axios
				.create({
					baseURL: process.env.NEXT_PUBLIC_PROD_PATH,
					headers: {
						Authorization:
							"bearer 15f3bbedadd97c183126ac913ec2bd519b72f40e3c2a085f54529f0e9a75866a31e93fe949997c737dfe1948793ca961de6d345ef0aa384ac67d5bdae4fe86e00667c327e0ab204a5ee06f1b8a2b6f488f6357d992c665586c4d065528b4c70c34f27b3df7701a6490304e5641bc9744d3ed7e56f578ba10b9d73516605e506f"
					}
				})
				.post("/api/orders", {
					products,
					currency,
					exchangeRate,
					discount,
					locale,
					user: user?.id
				});

			await stripe?.redirectToCheckout({
				sessionId: res.data.stripeSession.id
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="z-50 flex h-full flex-col  uppercase text-white">
			<h1 className=" bg-[rgb(12,12,12)] p-6 text-center text-2xl font-bold">
				<span className="mr-2 rounded-full bg-red-600 px-3 py-1">{count}</span> {t("cart.content")}
			</h1>

			{products.length > 0 ? (
				<>
					<div className="shadow-inset flex h-full w-full flex-1 flex-col gap-3 pt-7">
						{products?.map((item) => (
							<div
								key={item.id}
								className="mx-auto flex max-h-[500px] w-[90%] flex-col gap-3 overflow-y-auto rounded-lg bg-[rgb(32,32,32)]"
							>
								<div
									className="item flex w-full items-center justify-between gap-5 bg-[rgb(12,12,12)] px-5"
									key={item.id}
								>
									<Link title="Product" href={`/product/${item.id}`}>
										<Image
											className="h-[100px] max-h-[100px] w-[80px] max-w-[80px] object-contain"
											src={process.env.NEXT_PUBLIC_PROD_PATH + item.image}
											width={80}
											height={100}
											alt={t("cart.productImage")}
										/>
									</Link>
									<div className="details flex flex-1 flex-col items-center justify-center">
										<h1 className="text-lg font-medium">{item.name}</h1>
										<div className="flex items-center justify-between gap-2">
											<p className="text-red-600">
												{`${item.quantity} x ${t("product.price", { amount: formatPrice(item.price, exchangeRate) })}`}
											</p>
											{item.onSale && (
												<div className="ml-2 flex items-center justify-center bg-red-600 px-2 font-bold uppercase">
													{t("cart.sale")}
												</div>
											)}
										</div>
									</div>
									<div className="flex items-center justify-center gap-2">
										<button
											className="delete cursor-pointer text-2xl"
											onClick={() => dispatch(removeItem(item.id))}
										>
											<i className="ri-indeterminate-circle-line text-[rgb(100,100,100)]  transition hover:text-red-600"></i>
										</button>
										<button
											className="delete cursor-pointer text-2xl"
											onClick={() => dispatch(increaseQuantity(item.id))}
										>
											<i className="ri-add-circle-line text-[rgb(100,100,100)] transition hover:text-red-600"></i>
										</button>
										<button
											className="delete cursor-pointer text-2xl"
											onClick={() => dispatch(removeAllOfItem(item.id))}
										>
											<i className="ri-delete-bin-line text-[rgb(100,100,100)] transition hover:text-red-600"></i>
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="mt-auto flex w-full bg-[rgb(12,12,12)] p-3 px-8">
						<div className="relative flex w-[300px] flex-col items-center justify-center">
							<label className="block w-full text-xl font-bold uppercase">
								{t("cart.discountCode")}
							</label>
							<div className="flex gap-3">
								<input
									type="text"
									value={formData.discount}
									onChange={handleChange}
									name="discount"
									className="w-full bg-white p-3 text-black"
								/>
								<button
									onClick={addCode}
									className=" bg-red-600 p-2 font-bold text-white transition hover:bg-red-500"
								>
									{t("cart.add")}
								</button>
							</div>
							{discountMessage && (
								<p className="absolute bottom-2 w-full cursor-default font-bold text-red-600 ">
									{discount == 0
										? t("cart.wrongCode")
										: t("cart.addedDiscount", { discount: discount })}
								</p>
							)}
						</div>

						<div className=" flex w-full flex-col items-end justify-center ">
							<div className="total flex flex-col justify-end  px-4 py-2   text-lg font-medium uppercase">
								<div className="flex items-end justify-end ">
									<span className="text-sm text-red-900   line-through">
										{t("product.price", { amount: oldPrice })}
									</span>
								</div>
								<div className="flex items-center justify-center gap-3 bg-[rgb(12,12,12)] font-bold">
									{discount != 0 && (
										<span className="rounded-lg bg-red-600 px-3">-{discount}%</span>
									)}
									<span>{t("cart.subtotal")}</span>
									<span className="text-red-600">{t("product.price", { amount: price })}</span>
								</div>
							</div>
							<button
								onClick={handlePayment}
								className="mb-3 flex w-[400px] cursor-pointer items-center justify-center gap-5 border-none bg-red-600 p-3 font-bold  uppercase text-white transition hover:bg-red-500"
							>
								{t("cart.checkout")}
							</button>
							<div className="flex  items-center justify-end gap-3 font-bold">
								<p
									className=" cursor-pointer bg-[rgb(26,26,26)] px-4 py-3 text-xs font-bold transition hover:bg-red-600"
									onClick={() => dispatch(resetCart())}
								>
									{t("cart.resetBtn")}
								</p>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="flex h-full w-full flex-col items-center justify-center">
					<h1 className="w-full text-center text-3xl font-bold">{t("cart.noProducts")}</h1>
					<i className="ri-shopping-cart-line w-full text-center text-[20rem]"></i>
				</div>
			)}
		</div>
	);
}
