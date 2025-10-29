"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { categories } from "../../data/categories";
import { CategoryItem } from "./CategoryItem";
import { useCategoryImage } from "../../lib/hooks/useCategoryImage";

export default function Navigation() {
	const { imageSrc, changeImageSrc } = useCategoryImage();

	return (
		<NavigationMenu.Root
			onValueChange={() => changeImageSrc("")}
			className="relative z-[30] hidden w-svw flex-1 justify-center lg:flex"
		>
			<NavigationMenu.List className="relative flex items-center justify-center gap-6 overflow-hidden">
				{categories.map((category) => (
					<CategoryItem
						key={category.id}
						category={category}
						imageSrc={imageSrc}
						onHoverSub={changeImageSrc}
					/>
				))}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
