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
			console.log(await res.data.stripeSession);
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
						className="inline-flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white outline-none"
						aria-label="Update dimensions"
					>
						<i className="ri-shopping-cart-2-line text-2xl"></i>
					</button>
					<p className="font-bold">{products.length}</p>
				</div>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade relative right-7 flex  w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]">
					<div className="z-50 bg-white p-5">
						<h1 className="mb-7 text-2xl font-light text-gray-400">Products in your cart</h1>
						{products?.slice(0, 3).map((item) => (
							<div className="item mb-7 flex items-center gap-5" key={item.id}>
								<Image
									className="h-[100px] max-h-[100px] w-[80px] max-w-[80px] object-cover"
									src={"http://localhost:1337" + item.image}
									width={80}
									height={100}
									alt=""
								/>
								<div className="details">
									<h1 className="text-lg font-medium">{item.name}</h1>
									<div className="price text-zinc-600">
										{item.quantity} x {item.price}zł
									</div>
								</div>
								<button
									className="delete cursor-pointer text-2xl text-red-600"
									onClick={() => dispatch(removeItem(item.id))}
								>
									<i className="ri-delete-bin-line"></i>
								</button>
							</div>
						))}
						{products.length > 3 && (
							<p className="text-gray-500">{`${products.length - 3} more...`}</p>
						)}
						<div className="total mb-5 flex justify-between text-lg font-medium">
							<span>SUBTOTAL</span>
							<span>{totalPrice()}zł</span>
						</div>
						<button
							onClick={handlePayment}
							className="mb-5 flex w-64 cursor-pointer items-center justify-center gap-5 border-none bg-zinc-950 p-2.5 font-medium text-white"
						>
							CHECKOUT
						</button>
						<span
							className="reset cursor-pointer text-xs text-red-600"
							onClick={() => dispatch(resetCart())}
						>
							Reset Cart
						</span>
					</div>
					<Popover.Close
						className="text-violet11 absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full outline-none "
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
