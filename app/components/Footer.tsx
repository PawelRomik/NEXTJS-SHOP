import { Separator } from "@radix-ui/themes";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="flex  w-full flex-col items-center justify-between gap-2 border-t-8 border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300  lg:flex-row lg:gap-0 lg:px-[6rem]">
			<p className="lg:w-1/3">{t("copyright")}</p>
			<nav className="flex items-center justify-center gap-3 lg:w-1/3">
				<Link href="/terms" title={t("terms")} className="hover:text-white">
					{t("terms")}
				</Link>
				<Separator orientation="vertical" className="bg-zinc-300" />
				<Link href="/privacy" title={t("privacy")} className="hover:text-white">
					{t("privacy")}
				</Link>
				<Separator orientation="vertical" className="bg-zinc-300" />
				<Link href="/contact" title={t("contact")} className="hover:text-white">
					{t("contact")}
				</Link>
			</nav>
			<hr className="h-[2px] w-full border-none bg-zinc-800 lg:hidden"></hr>
			<div className="flex items-center justify-end lg:w-1/3">
				<ul className="flex items-center justify-end gap-2 text-2xl">
					<li>
						<Link
							href={"https://www.facebook.com"}
							title={t("facebookHover")}
							className="hover:text-white"
						>
							<i className="ri-facebook-box-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://www.instagram.com"}
							title={t("instagramHover")}
							className="hover:text-white"
						>
							<i className="ri-instagram-fill"></i>
						</Link>
					</li>
					<li>
						<Link href={"https://x.com"} title={t("twitterHover")} className="hover:text-white">
							<i className="ri-twitter-x-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://www.youtube.com"}
							title={t("youtubeHover")}
							className="hover:text-white"
						>
							<i className="ri-youtube-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://discord.com"}
							title={t("discordHover")}
							className="hover:text-white"
						>
							<i className="ri-discord-fill"></i>
						</Link>
					</li>
					<li>
						<LanguageSwitcher />
					</li>
				</ul>
			</div>
		</footer>
	);
}
