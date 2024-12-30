"use client";

import { SignUpButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export default function LoginButton() {
	const t = useTranslations("shop");

	return (
		<>
			<SignUpButton>
				<button className="flex h-full w-full items-center justify-center bg-red-600 p-2 font-bold text-white hover:scale-105 hover:bg-zinc-800">
					{t("loginButton")}
				</button>
			</SignUpButton>
		</>
	);
}
