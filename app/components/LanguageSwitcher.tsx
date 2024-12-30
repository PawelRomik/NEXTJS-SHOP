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
		<DropdownMenu>
			<DropdownMenuTrigger className="outline-none">
				<Flag country={locale} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="rounded-none border-[3px] border-red-600 bg-zinc-900 p-0 text-white">
				<DropdownMenuLabel className="w-full  bg-zinc-900 px-3 py-2 text-center text-red-600">
					{t("changeLanguage")}
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="m-0 h-[3px] bg-red-600" />

				<div className="grid grid-cols-2 gap-[2px] bg-zinc-900">
					{locales.map((locale) => (
						<CountryItem country={locale} key={locale} />
					))}
				</div>
				<DropdownMenuArrow className="fill-red-600" />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
