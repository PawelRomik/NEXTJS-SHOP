import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function ProductsSectionIcons() {
	const t = await getTranslations("footer");

	return (
		<ul className="absolute bottom-5 flex h-full w-full items-end  justify-around gap-2 text-3xl md:bottom-0 md:w-auto md:flex-col md:text-5xl">
			<li>
				<Link
					href={"https://www.facebook.com"}
					title={t("facebookHover")}
					className="hover:text-white"
				>
					<i className="ri-facebook-box-fill rounded-full border-4 border-red-700 bg-[rgba(0,0,0,0.3)] p-2 text-red-600 hover:border-red-600 hover:text-red-500"></i>
				</Link>
			</li>
			<li>
				<Link
					href={"https://www.instagram.com"}
					title={t("instagramHover")}
					className="hover:text-white"
				>
					<i className="ri-instagram-fill rounded-full border-4 border-red-700 bg-[rgba(0,0,0,0.3)] p-2 text-red-600 hover:border-red-600 hover:text-red-500"></i>
				</Link>
			</li>
			<li>
				<Link href={"https://x.com"} title={t("twitterHover")} className="hover:text-white">
					<i className="ri-twitter-x-fill rounded-full border-4 border-red-700 bg-[rgba(0,0,0,0.3)] p-2 text-red-600 hover:border-red-600 hover:text-red-500"></i>
				</Link>
			</li>
			<li>
				<Link
					href={"https://www.youtube.com"}
					title={t("youtubeHover")}
					className="hover:text-white"
				>
					<i className="ri-youtube-fill rounded-full border-4 border-red-700 bg-[rgba(0,0,0,0.3)] p-2 text-red-600 hover:border-red-600 hover:text-red-500"></i>
				</Link>
			</li>
			<li>
				<Link href={"https://discord.com"} title={t("discordHover")} className="hover:text-white">
					<i className="ri-discord-fill rounded-full border-4 border-red-700 bg-[rgba(0,0,0,0.3)] p-2 text-red-600 hover:border-red-600 hover:text-red-500"></i>
				</Link>
			</li>
		</ul>
	);
}
