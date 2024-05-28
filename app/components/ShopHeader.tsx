import CartPopover from "./CartPopover";
import Hamburger from "./Hamburger";
import NavigationLinks from "./NavigationLinks";
import SearchBar from "./SearchBar";
import ShopLogo from "./ShopLogo";
import { Suspense } from "react";
import UserProfile from "./UserProfile";
import { SignedIn } from "@clerk/nextjs";

function SearchBarFallback() {
	return <>Loading</>;
}

export default function ShopHeader() {
	return (
		<header className="sticky top-0 z-10 mx-auto flex w-full items-center justify-between border-b-2 bg-white p-4">
			<Hamburger />
			<ShopLogo />

			<NavigationLinks />
			<Suspense fallback={<SearchBarFallback />}>
				<SearchBar />
			</Suspense>

			<SignedIn>
				<CartPopover />
			</SignedIn>

			<UserProfile />
		</header>
	);
}
