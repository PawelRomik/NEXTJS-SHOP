"use client";

import { useRef } from "react";
import axios from "axios";
import * as Popover from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { removeItem, increaseQuantity, resetCart, removeAllOfItem } from "../redux/cardReducer";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "../lib/utils/formatPrice";
import { useCurrency } from "../context/CurrencyProvider";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type RootState = {
	cart: {
		products: any[];
		count: number;
	};
};

export default function CartPopover() {
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState(false);
	const products = useSelector((state: RootState) => state.cart.products);
	const count = useSelector((state: RootState) => state.cart.count);
	const dispatch = useDispatch();
	const { exchangeRate, currency } = useCurrency();
	const locale = useLocale();
	const { user } = useUser();

	const totalPrice = () => {
		let total = 0;
		products.forEach((item) => {
			total += item.quantity * parseFloat(formatPrice(item.price, exchangeRate));
		});
		return total.toFixed(2);
	};

	const prevTotalQuantity = useRef(products.reduce((sum, item) => sum + item.quantity, 0));

	useEffect(() => {
		const currentTotalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);

		if (currentTotalQuantity > prevTotalQuantity.current) {
			setIsOpen(true);
		}

		prevTotalQuantity.current = currentTotalQuantity;
	}, [products]);

	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PROD_KEY || "");

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
		<Popover.Root open={isOpen} defaultOpen={false} onOpenChange={(open) => setIsOpen(open)}>
			<Popover.Trigger asChild>
				<div className="flex items-center justify-center">
					<button
						className="inline-flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full outline-none"
						aria-label="Update dimensions"
					>
						<i className="ri-shopping-cart-2-line relative text-3xl">
							{count > 0 && (
								<span className="z-3 absolute left-[10px]  top-0 flex h-[15px] w-[30px] items-center justify-center rounded-full bg-red-700 py-2 font-sans text-sm font-bold text-white">
									{count < 10 ? count : "9+"}
								</span>
							)}
						</i>
					</button>
				</div>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					onInteractOutside={(event) => {
						if ((event.target as HTMLElement).closest(".ignore-popover-close")) {
							event.preventDefault();
						}
					}}
					className="flex w-[100vw] origin-top animate-showNav rounded-lg border-2 border-red-600 bg-[rgb(20,20,20)]  lg:w-auto  "
				>
					<div className="z-50 uppercase text-white">
						<h1 className="mb-7 bg-[rgb(12,12,12)] p-3 text-center text-2xl font-bold">
							{t("cart.content")}
						</h1>
						<div className=" px-5">
							{products?.slice(0, 3).map((item) => (
								<div
									className="item mb-7 flex w-full items-center justify-between gap-5 bg-[rgb(12,12,12)] px-5"
									key={item.id}
								>
									<Image
										className="h-[100px] max-h-[100px] w-[80px] max-w-[80px] object-contain"
										src={process.env.NEXT_PUBLIC_PROD_PATH + item.image}
										width={80}
										height={100}
										alt={t("cart.productImage")}
									/>
									<div className="details">
										<h1 className="text-lg font-medium">{item.name}</h1>
										<div className="flex items-center justify-between gap-2">
											<p className="text-red-600">
												{item.quantity} x{" "}
												{t("product.price", { amount: formatPrice(item.price, exchangeRate) })}
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
							))}
							{products.length > 0 ? (
								<>
									<div className="total mb-5 flex justify-end gap-3 text-lg font-medium uppercase">
										<span>{t("cart.subtotal")}</span>
										<span className="text-red-600">
											{t("product.price", { amount: totalPrice() })}
										</span>
									</div>
									<button
										onClick={handlePayment}
										className="mx-auto mb-5 flex w-full cursor-pointer items-center justify-center gap-5 border-none bg-red-600 p-3 font-medium uppercase text-white transition hover:bg-red-500"
									>
										{t("cart.checkout")}
									</button>
									<p
										className="cursor-pointer py-3 text-xs font-bold text-red-600 hover:text-red-400"
										onClick={() => dispatch(resetCart())}
									>
										{t("cart.resetBtn")}
									</p>
								</>
							) : (
								<p>{t("cart.noProducts")}</p>
							)}
						</div>
					</div>
					<Popover.Close
						className="absolute right-[5px] top-[5px] z-50 inline-flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full text-red-600 outline-none hover:text-red-400 "
						aria-label="Close"
					>
						<i className="ri-close-circle-line"></i>
					</Popover.Close>
					<Popover.Arrow width={20} height={10} className="fill-red-600" />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
