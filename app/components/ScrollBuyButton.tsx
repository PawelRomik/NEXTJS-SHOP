"use client";
import React, { useState, useEffect, useCallback } from "react";
import BuyButton from "./BuyButton";

type BuyButtonsProps = {
	currProductProp: any;
};

export default function ScrollBuyButton({ currProductProp }: BuyButtonsProps) {
	const [isVisible, setIsVisible] = useState(false);
	const others = document.getElementById("others");
	console.log(others);

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
			<div className="absolute right-[5rem] flex h-full items-center justify-center gap-3 text-white lg:right-[6rem]">
				<p className=" text-xl font-bold lg:text-3xl">
					PLN {currProductProp.salePrice ? currProductProp.salePrice : currProductProp.price}
				</p>
				<div className="w-[200px]">
					<BuyButton currProductProp={currProductProp} />
				</div>
			</div>
		</div>
	);
}
