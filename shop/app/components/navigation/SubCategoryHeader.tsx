"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

type SubCategoryHeaderProps = {
	title: string;
};

export function SubCategoryHeader({ title }: SubCategoryHeaderProps) {
	return (
		<div className="relative">
			<h2 className="w-auto text-zinc-400">{title}</h2>
			<NavigationMenu.Trigger
				className="absolute right-2 top-0 text-2xl"
				onPointerMove={(event) => event.preventDefault()}
				onPointerLeave={(event) => event.preventDefault()}
			>
				<button className="hover:text-red-600">
					<i className="ri-close-line"></i>
				</button>
			</NavigationMenu.Trigger>
		</div>
	);
}
