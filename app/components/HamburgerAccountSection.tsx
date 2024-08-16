import { SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import nextLogo from "../../public/logo.png";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export default async function HamburgerAccountSection() {
	const { user } = useUser();
	const t = useTranslations("common");

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
					{t("hamburgerLoggedIn")}
					{user?.username}!
				</SignedIn>
				<SignedOut>{t("hamburgerNotLoggedIn")}</SignedOut>
			</h1>
			<div className="flex w-full items-center justify-center gap-3">
				<SignedIn>
					<button className="flex w-[30%] items-center justify-center rounded-full border-2 border-red-600 bg-black px-3 py-2 text-sm">
						{t("hamburgerSettings")}
					</button>
					<SignOutButton>
						<button className="flex w-[30%] items-center justify-center rounded-full border-2 border-red-600 bg-black px-3 py-2 text-sm">
							{t("hamburgerLogOut")}
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
