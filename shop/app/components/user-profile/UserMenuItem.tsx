"use client";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useTranslations } from "next-intl";

type UserMenuItemProps = {
	href: string;
	icon: string;
	label: string;
};

export default function UserMenuitem({ href, icon, label }: UserMenuItemProps) {
	const t = useTranslations("hamburger");
	return (
		<DropdownMenu.Item
			asChild
			className="group relative mt-3 flex w-full items-center  gap-1 bg-[rgb(12,12,12)]   "
		>
			<Link
				href={href}
				className="flex h-[25px] w-full cursor-pointer select-none justify-start  rounded-[3px] bg-[rgb(12,12,12)] py-5 pl-3 text-[14px]   leading-none outline-none transition hover:bg-red-600 "
			>
				<div className="flex gap-1 ">
					<i className={icon}></i> {label}
				</div>
			</Link>
		</DropdownMenu.Item>
	);
}
