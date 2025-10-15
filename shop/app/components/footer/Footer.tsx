import LanguageSwitcher from "../language/LanguageSwitcher";
import SocialLinks from "./SocialLinks";
import DocsList from "./DocsList";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
	const t = await getTranslations("footer");

	return (
		<footer className="flex  w-full flex-col items-center justify-between gap-2 border-t-8 border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300  lg:flex-row lg:gap-0 lg:px-[6rem]">
			<p className="lg:w-1/3">{t("copyright")}</p>
			<DocsList />
			<hr aria-hidden="true" className="h-[2px] w-full border-none bg-zinc-800 lg:hidden" />
			<div className="flex items-center justify-end lg:w-1/3">
				<ul className="flex flex-wrap items-center justify-end gap-2 text-2xl">
					<SocialLinks />
					<li className="relative overflow-hidden">
						<LanguageSwitcher />
					</li>
				</ul>
			</div>
		</footer>
	);
}
