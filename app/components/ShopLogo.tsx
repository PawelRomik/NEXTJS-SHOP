import Link from "next/link";
import nextLogo from "../../public/logo.png";
import Image from "next/image";

export default function ShopLogo() {
	return (
		<div className=" lg:w-1/3">
			<Link href="/" title="Ephonix" className="flex items-center justify-start gap-2 lg:w-12">
				<Image src={nextLogo} className="hidden w-12 lg:block" alt="shop logo" />
				<h1 className="text-3xl font-bold ">Ephonix</h1>
			</Link>
		</div>
	);
}
