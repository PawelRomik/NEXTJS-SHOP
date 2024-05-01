import Link from "next/link";
import nextLogo from "../../public/logo.png";
import Image from "next/image";

export default function ShopLogo() {
	return (
		<Link href="/" title="N3XT SHOP">
			<div className="flex w-full items-center justify-center gap-2 lg:w-auto">
				<Image src={nextLogo} className="hidden w-12 lg:block" alt="shop logo" />
				<h1 className="text-3xl font-bold">N3XT SH0P</h1>
			</div>
		</Link>
	);
}
