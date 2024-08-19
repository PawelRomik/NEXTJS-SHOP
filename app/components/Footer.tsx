import { Separator } from "@radix-ui/themes";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations("common");

	return (
		<footer className="flex  w-full flex-col items-center justify-between gap-2 border-t-8 border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300 lg:flex-row lg:gap-0 lg:px-[6rem]">
			<p className="lg:w-1/3">{t("footerCopyright")}</p>
			<nav className="flex items-center justify-center gap-3 lg:w-1/3">
				<Link href="/terms" title="terms and conditions" className="hover:text-white">
					{t("footerTerms")}
				</Link>
				<Separator orientation="vertical" className="bg-zinc-300" />
				<Link href="/privacy" title="rules" className="hover:text-white">
					{t("footerPrivacy")}
				</Link>
				<Separator orientation="vertical" className="bg-zinc-300" />
				<Link href="/contact" title="rules" className="hover:text-white">
					{t("footerContact")}
				</Link>
			</nav>
			<hr className="h-[2px] w-full border-none bg-zinc-800 lg:hidden"></hr>
			<div className="flex items-center justify-end lg:w-1/3">
				<ul className="flex items-center justify-end gap-2 text-2xl">
					<li>
						<Link
							href={"https://www.facebook.com"}
							title={t("footerFacebookHover")}
							className="hover:text-white"
						>
							<i className="ri-facebook-box-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://www.instagram.com"}
							title={t("footerInstagramHover")}
							className="hover:text-white"
						>
							<i className="ri-instagram-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://x.com"}
							title={t("footerTwitterHover")}
							className="hover:text-white"
						>
							<i className="ri-twitter-x-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://www.youtube.com"}
							title={t("footerYoutubeHover")}
							className="hover:text-white"
						>
							<i className="ri-youtube-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://discord.com"}
							title={t("footerDiscordHover")}
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
