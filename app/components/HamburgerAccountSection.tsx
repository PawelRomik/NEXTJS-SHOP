import { SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import nextLogo from "../../public/logo.png";
import { useUser } from "@clerk/nextjs";
import initTranslations from "../i18n";

export default async function HamburgerAccountSection({ locale }: { locale: string }) {
	const { user } = useUser();
	const { t } = await initTranslations(locale, ["common", "shop"]);

	return (
		<>
			<Image
				src={user?.imageUrl || nextLogo}
				alt="avatar"
				className="rounded-full border-2 border-red-600"
				width={100}
				height={100}
			/>
			<h1 className="text-xl">
				<SignedIn>
					{t("common:hamburgerLoggedIn")}
					{user?.username}!
				</SignedIn>
				<SignedOut>{t("common:hamburgerNotLoggedIn")}</SignedOut>
			</h1>
			<div className="flex w-full items-center justify-center gap-3">
				<SignedIn>
					<button className="flex w-[30%] items-center justify-center rounded-full border-2 border-red-600 bg-black px-3 py-2 text-sm">
						{t("common:hamburgerSettings")}
					</button>
					<SignOutButton>
						<button className="flex w-[30%] items-center justify-center rounded-full border-2 border-red-600 bg-black px-3 py-2 text-sm">
							{t("common:hamburgerLogOut")}
						</button>
					</SignOutButton>
				</SignedIn>
				<SignedOut>
					<div className="flex w-[30%] items-center justify-center rounded-full border-2 border-red-600 bg-black px-3 py-2 text-sm">
						<SignUpButton />
					</div>
				</SignedOut>
			</div>
		</>
	);
}
