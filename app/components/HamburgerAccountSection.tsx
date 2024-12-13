import { SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import * as Avatar from "@radix-ui/react-avatar";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export default function HamburgerAccountSection() {
	const { user } = useUser();
	const t = useTranslations("hamburger");

	return (
		<>
			<Avatar.Root className="inline-flex size-[100px] select-none items-center justify-center overflow-hidden rounded-full border-[2px] border-white  align-middle">
				<Avatar.Image
					className="size-full rounded-[inherit] object-cover"
					src={user?.imageUrl}
					alt="avatar"
				/>
				<Avatar.Fallback
					className="leading-1 flex size-full items-center justify-center bg-zinc-800 text-[15px] font-medium text-white"
					delayMs={600}
				>
					{user?.username?.substring(0, 2).toUpperCase()}
				</Avatar.Fallback>
			</Avatar.Root>
			<h1 className="text-xl">
				<SignedIn>
					{t("loggedIn")}
					{user?.username}!
				</SignedIn>
				<SignedOut>{t("notLoggedIn")}</SignedOut>
			</h1>
			<div className="flex w-full items-center justify-center gap-3">
				<SignedIn>
					<button className="flex w-[30%] items-center justify-center rounded-full border-2 border-red-600 bg-black px-3 py-2 text-sm">
						{t("settings")}
					</button>
					<SignOutButton>
						<button className="flex w-[30%] items-center justify-center rounded-full border-2 border-red-600 bg-black px-3 py-2 text-sm">
							{t("logOut")}
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
