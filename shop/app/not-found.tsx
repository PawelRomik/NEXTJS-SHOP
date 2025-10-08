export const dynamic = "force-dynamic";

import Link from "next/link";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import ShopHeader from "./components/header/ShopHeader";
import Footer from "./components/footer/Footer";
import { useTranslations } from "next-intl";
import nextLogo from "../public/logo.png";
import Image from "next/image";

export default function NotFound() {
	const t = useTranslations();

	return (
		<div className={` roboto flex min-h-screen flex-col`}>
			<ShopHeader />
			<div className="flex flex-1 items-stretch bg-[rgb(20,20,20)]">
				<div className="flex w-full items-center justify-center py-20">
					<div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center text-3xl font-bold text-white ">
						<Image
							src={nextLogo}
							width={220}
							height={300}
							className="hidden w-[220px] lg:block"
							alt={t("common.shopLogo")}
						/>
						<h2 className="-rotate-3 text-4xl text-red-600">ERROR 404!</h2>
						<p className="rotate-3">{t("notFound.notFoundAlt")}</p>
						<div className="flex gap-3">
							<Link href="/support" title={t("order.home")}>
								<button className="-rotate-3 rounded-lg bg-red-600 px-6 py-3 transition hover:bg-red-500">
									{t("categories.support")}
								</button>
							</Link>
							<Link href="/" title={t("order.home")}>
								<button className="rotate-3 rounded-lg bg-red-600 px-6 py-3 transition hover:bg-red-500">
									{t("order.home")}
								</button>
							</Link>
						</div>
					</div>
				</div>
				<ScrollToTopButton />
			</div>
			<Footer />
		</div>
	);
}
