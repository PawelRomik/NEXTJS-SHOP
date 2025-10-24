"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ProductsSectionIcons() {
	const t = useTranslations("footer");

	const icons = [
		{ href: "https://www.facebook.com", title: t("facebookHover"), icon: "ri-facebook-box-fill" },
		{ href: "https://www.instagram.com", title: t("instagramHover"), icon: "ri-instagram-fill" },
		{ href: "https://x.com", title: t("twitterHover"), icon: "ri-twitter-x-fill" },
		{ href: "https://www.youtube.com", title: t("youtubeHover"), icon: "ri-youtube-fill" },
		{ href: "https://discord.com", title: t("discordHover"), icon: "ri-discord-fill" }
	];

	return (
		<ul className="absolute bottom-5 flex h-full w-full items-end  justify-around gap-2 text-3xl md:bottom-0 md:w-auto md:flex-col md:text-5xl">
			{icons.map(({ href, title, icon }) => (
				<li key={icon}>
					<Link href={href} title={title} className="hover:text-white">
						<i
							className={`${icon} rounded-full border-4 border-red-700 bg-[rgba(0,0,0,0.3)] p-2 text-red-600 hover:border-red-600 hover:text-red-500`}
						/>
					</Link>
				</li>
			))}
		</ul>
	);
}
