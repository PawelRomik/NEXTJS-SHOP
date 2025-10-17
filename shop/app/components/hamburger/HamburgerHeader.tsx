"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import HamburgerSearch from "./HamburgerSearch";
import HamburgerAccountSection from "./HamburgerAccountSection";

type HamburgerHeaderProps = {
	onClick: () => void;
};

export default function HamburgerHeader({ onClick }: HamburgerHeaderProps) {
	return (
		<div className="flex h-full flex-col">
			<NavigationMenu.Item className="flex h-[60px] w-full list-none items-center justify-between bg-[rgb(11,11,11)] px-3 md:h-[100px] md:px-6 ">
				<button onClick={onClick}>
					<i className="ri-close-circle-line text-3xl text-red-600 md:text-4xl"></i>
				</button>
				<HamburgerSearch />
			</NavigationMenu.Item>
			<NavigationMenu.Item className="shadow-inset flex h-full min-h-[300px] w-full flex-col items-center justify-center border-b-4 border-red-800 pt-5 md:min-h-[700px]">
				<HamburgerAccountSection />
			</NavigationMenu.Item>
		</div>
	);
}
