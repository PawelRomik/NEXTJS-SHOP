import CartPopover from "../cart/CartPopover";
import Hamburger from "../hamburger/Hamburger";
import ShopLogo from "./ShopLogo";
import UserProfile from "../UserProfile";
import { SignedIn } from "@clerk/nextjs";
import NavigationLinks from "./NavigationLinks";
import SearchBar from "../searchbar/SearchBar";

export default function ShopHeader() {
	return (
		<header className="sticky top-0 z-30 mx-auto box-border flex h-full w-full items-center justify-between border-b-[3px] border-b-red-600 bg-black p-4 text-white lg:px-[6rem]">
			<Hamburger />
			<ShopLogo />
			<nav className="hidden h-full w-1/3 items-center justify-center lg:flex">
				<NavigationLinks />
			</nav>
			<div className="flex h-full items-center justify-end gap-5 lg:w-1/3">
				<SearchBar />
				<SignedIn>
					<CartPopover />
				</SignedIn>
				<div className="hidden lg:block">
					<UserProfile />
				</div>
			</div>
		</header>
	);
}
