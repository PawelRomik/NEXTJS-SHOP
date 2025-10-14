"use client";

import { useTranslations } from "next-intl";

export default function CartNoProducts() {
	const t = useTranslations("cart");
	return (
		<div className="flex h-full flex-col items-center justify-center text-center">
			<h1 className="text-3xl font-bold">{t("noProducts")}</h1>
			<i className="ri-shopping-cart-line text-[20rem]" />
		</div>
	);
}
