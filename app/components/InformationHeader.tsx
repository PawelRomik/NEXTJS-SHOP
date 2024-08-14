import Link from "next/link";
import ShopLogo from "./ShopLogo";
import initTranslations from "../i18n";

export default async function InformationHeader({ locale }: { locale: string }) {
	const { t } = await initTranslations(locale, ["common", "information"]);

	return (
		<header className="sticky top-0 z-10 mx-auto box-border flex h-full w-full items-center justify-between border-b-[3px] border-b-red-600 bg-black p-4 text-white lg:px-[6rem]">
			<div className="flex items-center justify-start">
				<Link href="/" title="Shop">
					<button className="flex lg:hidden">
						<i className="ri-home-2-line text-2xl"></i>
					</button>
				</Link>
			</div>
			<ShopLogo locale={locale} />
			<div className="hidden h-full w-1/3 items-center justify-center lg:flex">
				<Link href="/" title="Shop">
					<p className="hover:border-b-2 hover:border-red-600 hover:text-red-600 ">
						{t("information:navShop")}
					</p>
				</Link>
			</div>

			<div className="flex h-full items-center justify-end gap-5 lg:w-1/3"></div>
		</header>
	);
}
