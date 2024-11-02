"use client";

import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function UserProfile() {
	const t = useTranslations("sign");
	return (
		<div className="flex items-center justify-center">
			<SignedIn>
				<Link className="text-3xl" href={"/user/settings"}>
					<i className="ri-user-line "></i>
				</Link>
			</SignedIn>
			<SignedOut>
				<div className="flex items-center justify-center font-bold">
					<SignInButton>{t("signIn")}</SignInButton>
				</div>
			</SignedOut>
		</div>
	);
}
