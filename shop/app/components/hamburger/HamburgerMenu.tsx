"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import HamburgerHeader from "./HamburgerHeader";
import { categories } from "../../data/categories";
import HamburgerCategory from "./HamburgerCategory";

type HamburgerMenuProps = {
	onClose: () => void;
	openCategoryId: number | null;
	setOpenCategoryId: (id: number | null) => void;
};

export default function HamburgerMenu({
	onClose,
	openCategoryId,
	setOpenCategoryId
}: HamburgerMenuProps) {
	return (
		<NavigationMenu.Root className="no-scrollbar fixed left-0 top-0 z-30 flex h-screen w-svw origin-left animate-showSearchbar flex-col justify-between overflow-y-auto bg-[rgb(20,20,20)] text-xl lg:hidden">
			<HamburgerHeader onClick={onClose} />
			<NavigationMenu.List className="relative flex w-full  list-none flex-col gap-1  md:text-3xl ">
				{categories.map((category) => (
					<NavigationMenu.Item key={category.id}>
						<HamburgerCategory
							category={category}
							openCategoryId={openCategoryId}
							setOpenCategoryId={setOpenCategoryId}
							onClose={onClose}
						/>
					</NavigationMenu.Item>
				))}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
