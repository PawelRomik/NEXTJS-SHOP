import ShopLogo from "./ShopLogo";

export default function InformationHeader() {
	return (
		<header className="sticky top-0 z-10 mx-auto flex w-full items-center justify-between border-b-2 bg-white p-4">
			<ShopLogo />
		</header>
	);
}
