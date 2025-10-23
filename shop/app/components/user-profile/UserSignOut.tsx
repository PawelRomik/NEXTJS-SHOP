"use client";
import { SignOutButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export default function UserSignOut() {
	const t = useTranslations("hamburger");
	return (
		<SignOutButton>
			<button className="group relative mt-3 flex w-full items-center  justify-center bg-[rgb(12,12,12)] ">
				<div className="flex h-[25px] w-full cursor-pointer select-none justify-start rounded-[3px] py-5  pl-3 text-[14px]  leading-none outline-none transition hover:bg-red-600 ">
					<div className="flex items-center justify-center gap-1">
						<i className="ri-logout-box-r-line"></i> {t("logOut")}
					</div>
				</div>
			</button>
		</SignOutButton>
	);
}
