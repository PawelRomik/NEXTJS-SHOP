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
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";

export default async function LanguageSwitcher() {
	const t = useTranslations("footer");
	const locale = await getLocale();

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="outline-none">
				<Flag country={locale} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="m-0 rounded-none border-[3px] border-red-600 bg-zinc-900 p-0 text-white">
				<DropdownMenuLabel className="w-full bg-[rgb(12,12,12)] px-3 py-2 text-center uppercase ">
					{t("changeLanguage")}
				</DropdownMenuLabel>

				<div className="grid grid-cols-2 gap-[2px] bg-[rgb(20,20,20)]">
					{locales.map((locale) => (
						<CountryItem country={locale} key={locale} />
					))}
				</div>
				<DropdownMenuArrow className="fill-red-600" />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
