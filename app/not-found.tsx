export const dynamic = "force-dynamic";

import Link from "next/link";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ShopHeader from "./components/ShopHeader";
import Footer from "./components/Footer";
import { useTranslations } from "next-intl";

export default function NotFound() {
	const t = useTranslations("notFound");

	return (
		<div className={` roboto flex min-h-screen flex-col`}>
			<ShopHeader />
			<div className="flex flex-1 items-stretch">
				<main className=" flex w-full flex-col items-center justify-center gap-6 bg-black p-6 text-2xl text-white">
					<h2 className="text-4xl font-bold text-white">{t("notFound")}</h2>
					<p className="text-xl text-zinc-300">{t("notFoundAlt")}</p>
					<Link
						href="/"
						title={t("home")}
						className=" rounded-full border-2 border-zinc-800 bg-black p-3 text-2xl font-bold text-zinc-300"
					>
						{t("home")}
					</Link>
				</main>
				<ScrollToTopButton />
			</div>
			<Footer />
		</div>
	);
}
