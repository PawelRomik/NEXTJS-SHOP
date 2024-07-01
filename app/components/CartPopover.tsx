"use client";

import axios from "axios";
import * as Popover from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../redux/cardReducer";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

type RootState = {
	cart: {
		products: any[];
	};
};

export default function CartPopover() {
	const products = useSelector((state: RootState) => state.cart.products);
	const dispatch = useDispatch();

	const totalPrice = () => {
		let total = 0;
		products.forEach((item) => {
			total += item.quantity * item.price;
		});
		return total.toFixed(2);
	};

	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PROD_KEY || "");

	const handlePayment = async () => {
		try {
			const stripe = await stripePromise;
			const res = await axios
				.create({
					baseURL: process.env.NEXT_PUBLIC_PROD_PATH,
					headers: {
						Authorization: "bearer " + process.env.NEXT_PUBLIC_APOLLO_AUTH_KEY
					}
				})
				.post("/api/orders", {
					products
				});

			await stripe?.redirectToCheckout({
				sessionId: res.data.stripeSession.id
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<div className="flex items-center justify-center lg:ml-2">
					<button
						className="inline-flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full outline-none"
						aria-label="Update dimensions"
					>
						<i className="ri-shopping-cart-2-line relative text-3xl">
							<span className="z-3 absolute left-[10px] top-0 flex h-[15px] w-[30px] items-center justify-center rounded-full bg-red-700 py-2 font-sans text-sm font-bold text-white">
								{products.length}
							</span>
						</i>
					</button>
				</div>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade relative right-7 flex w-full  rounded border-2 border-zinc-200 bg-white p-5 will-change-[transform,opacity]">
					<div className="z-50 bg-white p-5">
						<h1 className="mb-7 text-2xl font-light text-gray-400">Products in your cart</h1>
						{products?.slice(0, 3).map((item) => (
							<div className="item mb-7 flex items-center gap-5" key={item.id}>
								<Image
									className="h-[100px] max-h-[100px] w-[80px] max-w-[80px] object-cover"
									src={process.env.NEXT_PUBLIC_PROD_PATH + item.image}
									width={80}
									height={100}
									alt=""
								/>
								<div className="details">
									<h1 className="text-lg font-medium">{item.name}</h1>
									<div className="flex items-center justify-start gap-2">
										<p className={`${item.onSale ? "text-red-600" : "text-zinc-600"}`}>
											{item.quantity} x {item.price}zł
										</p>
										{item.onSale && (
											<div className="flex items-center justify-center bg-red-600 px-2 font-bold text-white">
												SALE
											</div>
										)}
									</div>
								</div>
								<button
									className="delete cursor-pointer text-2xl"
									onClick={() => dispatch(removeItem(item.id))}
								>
									<i className="ri-close-circle-line"></i>
								</button>
							</div>
						))}
						{products.length > 3 && (
							<p className="text-gray-500">{`${products.length - 3} more...`}</p>
						)}
						{products.length > 0 ? (
							<>
								<div className="total mb-5 flex justify-between text-lg font-medium">
									<span>SUBTOTAL</span>
									<span>{totalPrice()}zł</span>
								</div>
								<button
									onClick={handlePayment}
									className="mx-auto mb-5 flex w-full cursor-pointer items-center justify-center gap-5 border-none bg-zinc-950 p-2.5 font-medium text-white"
								>
									CHECKOUT
								</button>
								<span
									className="reset cursor-pointer text-xs text-red-600"
									onClick={() => dispatch(resetCart())}
								>
									Reset Cart
								</span>
							</>
						) : (
							<p>No products in cart.</p>
						)}
					</div>
					<Popover.Close
						className="text-violet11 absolute right-[5px] top-[5px] z-50 inline-flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full outline-none "
						aria-label="Close"
					>
						X
					</Popover.Close>
					<Popover.Arrow className="fill-white" />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
