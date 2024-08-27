import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { locales } from "@/i18n";
import CountryItem from "./CountryItem";
import Flag from "./Flag";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

export default async function LanguageSwitcher() {
	const t = useTranslations("footer");
	const locale = await getLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="outline-none">
				<Flag country={locale} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="rounded-none border-2 border-red-600 bg-zinc-900 p-0 text-white">
				<DropdownMenuLabel className="w-full  border-b-[2px] border-b-red-600 bg-zinc-950 px-3 py-2 text-center">
					{t("changeLanguage")}
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="m-0 bg-black" />

				<div className="grid grid-cols-2 gap-[2px] bg-black">
					{locales.map((locale) => (
						<CountryItem country={locale} key={locale} />
					))}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
