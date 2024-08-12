"use client";

import { SignUpButton } from "@clerk/nextjs";
import { useTranslation } from "next-i18next";

export default function LoginButton() {
	const { t } = useTranslation();

	return (
		<>
			<SignUpButton>
				<button className="flex h-full w-full items-center justify-center bg-zinc-900 p-2 font-bold text-white hover:scale-105 hover:bg-zinc-800">
					{t("shop:loginButton")}
				</button>
			</SignUpButton>
		</>
	);
}
