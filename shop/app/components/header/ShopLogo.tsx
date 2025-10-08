import Link from "next/link";
import nextLogo from "../../../public/logo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ShopLogo() {
	const t = useTranslations("common");
	return (
		<div className=" lg:w-1/3">
			<Link href="/" title="Ephonix" className="flex items-center justify-start lg:w-12 lg:gap-2">
				<Image src={nextLogo} className="w-12 translate-x-2" alt={t("shopLogo")} />
				<h1 className="text-3xl font-bold ">Ephonix</h1>
			</Link>
		</div>
	);
}
