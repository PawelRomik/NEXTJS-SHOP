import CartPopover from "./CartPopover";
import Hamburger from "./Hamburger";
import SearchBar from "./SearchBar";
import ShopLogo from "./ShopLogo";
import { Suspense } from "react";
import UserProfile from "./UserProfile";
import { SignedIn } from "@clerk/nextjs";

export default function ShopHeader() {
	return (
		<header className="sticky top-0 z-10 mx-auto flex w-full items-center justify-between border-b-[3px] border-b-red-600 bg-black p-4 text-white">
			<Hamburger />
			<ShopLogo />
			<nav className="hidden w-1/3 items-center justify-center lg:flex">
				<ul className="flex items-center justify-center gap-6 text-xl">
					<li>
						Shop <i className="ri-arrow-drop-down-line"></i>
					</li>
					<li>
						Components <i className="ri-arrow-drop-down-line"></i>
					</li>
					<li>
						Accessories <i className="ri-arrow-drop-down-line"></i>
					</li>
					<li>Support</li>
				</ul>
			</nav>
			<div className="flex items-center justify-end gap-5 lg:w-1/3">
				<SignedIn>
					<CartPopover />
				</SignedIn>
				<i className="ri-search-line text-3xl"></i>

				<div className="hidden lg:block">
					<UserProfile />
				</div>
			</div>
		</header>
	);
}
