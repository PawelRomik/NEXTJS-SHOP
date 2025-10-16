import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Separator } from "@radix-ui/themes";

export default async function DocsList() {
	const t = await getTranslations("footer");

	const pageLinks = [
		{ href: "/terms", label: t("terms") },
		{ href: "/privacy", label: t("privacy") },
		{ href: "/contact", label: t("contact") }
	];

	return (
		<nav className="flex items-center justify-center gap-3 lg:w-1/3">
			{pageLinks.map((link, index) => (
				<div key={link.href} className="flex items-center gap-3">
					<Link href={link.href} className="hover:text-white" title={link.label}>
						{link.label}
					</Link>
					{index < pageLinks.length - 1 && (
						<Separator orientation="vertical" className="bg-zinc-300" aria-hidden="true" />
					)}
				</div>
			))}
		</nav>
	);
}
