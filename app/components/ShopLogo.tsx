import Link from "next/link";
import nextLogo from "../../public/logo.png";
import Image from "next/image";

export default function ShopLogo() {
	return (
		<Link href="/" title="N3XT SHOP" className="w-1/3">
			<div className="flex w-full items-center justify-start gap-2 lg:w-auto">
				<Image src={nextLogo} className="hidden w-12 lg:block" alt="shop logo" />
				<h1 className="text-3xl font-bold italic">Ephonix</h1>
			</div>
		</Link>
	);
}
