"use client";
import { useTranslations } from "next-intl";

type CartCounterProps = {
	count: number;
};

export default function CartCounter({ count }: CartCounterProps) {
	const t = useTranslations("cart");
	if (count < 1) return null;
	return (
		<h1 className="bg-[rgb(12,12,12)] p-6 text-center text-2xl font-bold">
			<span className="mr-2 rounded-full bg-red-600 px-3 py-1">{count}</span> {t("content")}
		</h1>
	);
}
