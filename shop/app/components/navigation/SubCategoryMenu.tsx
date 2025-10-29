"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslations } from "next-intl";
import { Category } from "../../data/categories";
import { SubCategoryImage } from "./SubCategoryImage";
import { SubCategoryHeader } from "./SubCategoryHeader";
import { SubCategoryList } from "./SubCategoryList";

type SubCategoryMenuProps = {
	category: Category;
	imageSrc: string;
	onHover: (slug: string) => void;
};

export function SubCategoryMenu({ category, imageSrc, onHover }: SubCategoryMenuProps) {
	const t = useTranslations("categories");

	return (
		<NavigationMenu.Content className="fixed left-0 top-0 z-50  flex w-screen origin-top animate-showNav items-start justify-center gap-6 overflow-hidden overflow-x-hidden border-b-[3px] border-b-red-600 bg-[rgb(20,20,20)]">
			<SubCategoryImage src={imageSrc} alt={category.slug} />
			<div className="m-0 flex w-1/3 flex-col gap-2 p-[22px] ">
				<SubCategoryHeader title={t(category.slug)} />
				{category.subCategories && (
					<SubCategoryList items={category.subCategories} onHover={onHover} />
				)}
			</div>
		</NavigationMenu.Content>
	);
}
