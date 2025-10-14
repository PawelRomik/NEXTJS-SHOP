"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

type CartDiscountProps = {
	onDiscountApply: (discount: number) => void;
};

const DISCOUNT_CODES: Record<string, number> = {
	//TEMP
	Rabat123: 30,
	AUTUMN10: 10
};

export default function CartDiscount({ onDiscountApply }: CartDiscountProps) {
	const t = useTranslations("cart");
	const [input, setInput] = useState("");
	const [message, setMessage] = useState<string | null>(null);

	const handleApply = () => {
		const value = DISCOUNT_CODES[input] || 0;
		onDiscountApply(value);
		setMessage(value ? t("addedDiscount", { discount: value }) : t("wrongCode"));
	};

	return (
		<div className="flex w-full flex-col items-center justify-center md:w-[300px] md:items-start ">
			<label className="block w-full text-xl font-bold uppercase">{t("discountCode")}</label>
			<div className="flex w-full md:gap-3">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="w-full bg-white p-3 text-black"
				/>
				<button
					onClick={handleApply}
					className="bg-red-600 p-2 font-bold text-white transition hover:bg-red-500"
				>
					{t("add")}
				</button>
			</div>
			{message && <p className="mt-2 font-bold text-red-600">{message}</p>}
		</div>
	);
}
