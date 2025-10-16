"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Flag from "./Flag";
import Link from "next/link";

export default function CountryItem({ country }: { country: string }) {
	const pathname = usePathname().substring(3);

	return (
		<DropdownMenuItem className="p-0">
			<Link
				href={`/${country}${pathname}`}
				className="flex w-full cursor-pointer items-center justify-center gap-2 p-1 font-bold  transition hover:bg-red-600 hover:text-white"
			>
				<Flag country={country} />
				<p className="bold uppercase">{country}</p>
			</Link>
		</DropdownMenuItem>
	);
}
