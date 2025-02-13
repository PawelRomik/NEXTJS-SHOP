"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

type UserCategoryLinkProps = {
	category: {
		name: string;
		slug: keyof IntlMessages["categories"];
	};
};

const UserCategoryLink = ({ category }: UserCategoryLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === `/pl/user/${category.slug}`;
	const t = useTranslations();

	return (
		<Link className="w-full" key={category.name} href={`/user/${category.slug}`}>
			<li
				className={`w-full border-b-4 p-[1rem]  pl-[2rem] text-center font-bold uppercase text-white transition 
        ${isActive ? "border-red-600 bg-red-600" : "border-[rgb(20,20,20)] bg-[rgb(20,20,20)] hover:border-[rgb(32,32,32)] hover:bg-[rgb(32,32,32)] "}`}
			>
				{t(`categories.${category.slug}`)}
			</li>
		</Link>
	);
};

export default UserCategoryLink;
