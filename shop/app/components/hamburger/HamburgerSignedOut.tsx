"use client";

import { SignInButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export default function HamburgerSignedOut() {
	const t = useTranslations();
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<p className="text-2xl font-bold uppercase md:text-4xl">{t("hamburger.notLoggedIn")}</p>
			<SignInButton>
				<button className=" flex gap-1 border-2 border-red-600 bg-[rgb(11,11,11)] p-1 px-4 text-base md:p-2 md:px-6 md:text-xl">
					<i className="ri-login-box-line"></i>
					{t("sign.signIn").toUpperCase()}
				</button>
			</SignInButton>
		</div>
	);
}
