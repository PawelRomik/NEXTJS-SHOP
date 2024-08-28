"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Flag from "./Flag";

export default function CountryItem({ country }: { country: string }) {
	const pathname = usePathname().substring(3);

	return (
		<DropdownMenuItem className="p-0">
			<a
				href={`/${country}${pathname}`}
				className="flex w-full cursor-pointer items-center justify-center gap-2 bg-zinc-950 p-1 transition  hover:bg-zinc-900 hover:text-white"
			>
				<Flag country={country} />
				<p className="bold uppercase">{country}</p>
			</a>
		</DropdownMenuItem>
	);
}
