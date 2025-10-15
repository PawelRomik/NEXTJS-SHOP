import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function SocialLinks() {
	const t = await getTranslations("footer");

	const socialLinks = [
		{ href: "https://www.facebook.com", icon: "ri-facebook-box-fill", label: t("facebookHover") },
		{ href: "https://www.instagram.com", icon: "ri-instagram-fill", label: t("instagramHover") },
		{ href: "https://x.com", icon: "ri-twitter-x-fill", label: t("twitterHover") },
		{ href: "https://www.youtube.com", icon: "ri-youtube-fill", label: t("youtubeHover") },
		{ href: "https://discord.com", icon: "ri-discord-fill", label: t("discordHover") }
	];

	return (
		<>
			{socialLinks.map((link) => (
				<li key={link.href}>
					<Link href={link.href} aria-label={link.label} className="hover:text-white">
						<i className={link.icon}></i>
					</Link>
				</li>
			))}
		</>
	);
}
