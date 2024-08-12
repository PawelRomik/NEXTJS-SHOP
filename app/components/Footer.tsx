import { Separator } from "@radix-ui/themes";
import Link from "next/link";
import initTranslations from "../i18n";

export default async function Footer({ locale }: { locale: string }) {
	const { t } = await initTranslations(locale, ["common", "shop"]);

	return (
		<footer className="flex  w-full flex-col items-center justify-between gap-2 border-t-8 border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300 lg:flex-row lg:gap-0 lg:px-[6rem]">
			<p className="lg:w-1/3">{t("common:footerCopyright")}</p>
			<nav className="flex items-center justify-center gap-3 lg:w-1/3">
				<Link href="/terms" title="terms and conditions" className="hover:text-white">
					{t("common:footerTerms")}
				</Link>
				<Separator orientation="vertical" className="bg-zinc-300" />
				<Link href="/privacy" title="rules" className="hover:text-white">
					{t("common:footerPrivacy")}
				</Link>
				<Separator orientation="vertical" className="bg-zinc-300" />
				<Link href="/contact" title="rules" className="hover:text-white">
					{t("common:footerContact")}
				</Link>
			</nav>
			<hr className="h-[2px] w-full border-none bg-zinc-800 lg:hidden"></hr>
			<div className="flex items-center justify-end lg:w-1/3">
				<ul className="flex items-center justify-end gap-2 text-2xl">
					<li>
						<Link
							href={"https://www.facebook.com"}
							title={t("common:footerFacebookHover")}
							className="hover:text-white"
						>
							<i className="ri-facebook-box-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://www.instagram.com"}
							title={t("common:footerInstagramHover")}
							className="hover:text-white"
						>
							<i className="ri-instagram-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://x.com"}
							title={t("common:footerTwitterHover")}
							className="hover:text-white"
						>
							<i className="ri-twitter-x-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://www.youtube.com"}
							title={t("common:footerYoutubekHover")}
							className="hover:text-white"
						>
							<i className="ri-youtube-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://discord.com"}
							title={t("common:footerDiscordHover")}
							className="hover:text-white"
						>
							<i className="ri-discord-fill"></i>
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}
