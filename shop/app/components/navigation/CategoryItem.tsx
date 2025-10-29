"use client";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { SubCategoryMenu } from "./SubCategoryMenu";
import { useTranslations } from "next-intl";
import { Category } from "../../data/categories";

type CategoryItemProps = {
	category: Category;
	imageSrc: string;
	onHoverSub: (slug: string) => void;
};

export function CategoryItem({ category, imageSrc, onHoverSub }: CategoryItemProps) {
	const t = useTranslations("categories");

	return (
		<NavigationMenu.Item key={category.id} className="relative">
			<NavigationMenu.Trigger className="font-bold text-white hover:text-red-600 data-[state=open]:text-red-600">
				<Link href={`/${category.slug}`} title={t(category.slug)}>
					{t(category.slug).toUpperCase()}
				</Link>
				{category.subCategories && <i className="ri-arrow-drop-down-line"></i>}
			</NavigationMenu.Trigger>
			{category.subCategories && (
				<SubCategoryMenu category={category} imageSrc={imageSrc} onHover={onHoverSub} />
			)}
		</NavigationMenu.Item>
	);
}
