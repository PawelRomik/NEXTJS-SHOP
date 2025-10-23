"use client";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export function useUserCategoryState(categoryName: string, categorySlug: string) {
	const pathname = usePathname();
	const locale = useLocale();

	const isOrder = categoryName.toLowerCase() === "order";
	const href = isOrder ? `/user/order` : `/user/${categorySlug}`;

	const isActive = isOrder
		? new RegExp(`^/${locale}/user/order(/\\d+)?$`).test(pathname)
		: pathname.startsWith(`/${locale}/user/${categorySlug}`);

	const isVisible = !isOrder || isActive;

	return { href, isActive, isVisible, isOrder };
}
