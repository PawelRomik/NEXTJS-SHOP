"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useUserCategoryState } from "../../lib/hooks/useUserCategoryState";

type UserCategoryLinkProps = {
	category: {
		name: string;
		slug: keyof IntlMessages["categories"];
	};
};

export default function UserCategoryLink({ category }: UserCategoryLinkProps) {
	const t = useTranslations();
	const { href, isActive, isVisible, isOrder } = useUserCategoryState(category.name, category.slug);

	if (!isVisible) return null;

	return (
		<Link href={href} className="w-full">
			<li
				className={`w-full border-b-4 border-[rgb(20,20,20)] bg-[rgb(20,20,20)] p-[1rem] text-center font-bold uppercase text-white transition
          ${isActive ? "border-red-600 bg-red-600" : "hover:border-[rgb(32,32,32)] hover:bg-[rgb(32,32,32)]"}`}
			>
				{isOrder ? t("order.order") : t(`categories.${category.slug}`)}
			</li>
		</Link>
	);
}
