"use client";
import { SignOutButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HamburgerSignedIn() {
	const t = useTranslations("hamburger");
	return (
		<div className="flex w-full flex-col items-center justify-center gap-2">
			<div className="flex w-full flex-wrap items-center justify-center gap-5 font-bold ">
				<Link href={"/user/settings"} title={t("settings")}>
					<button className=" flex gap-1 border-2 border-red-600 bg-[rgb(11,11,11)] p-1 px-4 text-base md:p-2 md:px-6 md:text-xl">
						<i className="ri-settings-2-line"></i>
						{t("settings").toUpperCase()}
					</button>
				</Link>
				<Link href={"/user/orders"} title={t("settings")}>
					<button className=" flex gap-1 border-2 border-red-600 bg-[rgb(11,11,11)] p-1 px-4 text-base md:p-2 md:px-6 md:text-xl">
						<i className="ri-bank-card-line"></i>
						{t("orders").toUpperCase()}
					</button>
				</Link>
				<SignOutButton>
					<button className=" flex gap-1 border-2 border-red-600 bg-[rgb(11,11,11)] p-1 px-4 text-base md:p-2 md:px-6 md:text-xl">
						<i className="ri-logout-box-line"></i>
						{t("logOut").toUpperCase()}
					</button>
				</SignOutButton>
			</div>
		</div>
	);
}
