"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

type UserCategoryLinkProps = {
	category: {
		name: string;
		slug: keyof IntlMessages["categories"];
	};
};

function UserCategoryLink({ category }: UserCategoryLinkProps) {
	const pathname = usePathname();
	const locale = useLocale();
	const isActive = pathname === `/pl/user/${category.slug}`;
	const t = useTranslations();
	let isOrder = false;
	let isOrderPath = false;

	if (category.name === "Order") {
		isOrder = true;
		if (new RegExp(`^/${locale}/user/order/\\d+$`).test(pathname)) {
			isOrderPath = true;
		}
	}

	return (
		<Link className="w-full" key={category.name} href={isOrder ? "#" : `/user/${category.slug}`}>
			<li
				className={`w-full border-b-4 p-[1rem]  pl-[2rem] text-center font-bold uppercase text-white transition ${isOrder && !isOrderPath && "opacity-0"}  ${isOrder && "bg-red-600"}
        ${isActive ? "border-red-600 bg-red-600" : "border-[rgb(20,20,20)] bg-[rgb(20,20,20)] hover:border-[rgb(32,32,32)] hover:bg-[rgb(32,32,32)] "}`}
			>
				{isOrder ? t(`order.order`) : t(`categories.${category.slug}`)}
			</li>
		</Link>
	);
};

export default UserCategoryLink;
