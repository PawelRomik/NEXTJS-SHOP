import { SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import * as Avatar from "@radix-ui/react-avatar";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export default function HamburgerAccountSection() {
	const { user } = useUser();
	const t = useTranslations("hamburger");

	return (
		<>
			<Avatar.Root className="inline-flex size-[120px] select-none items-center justify-center overflow-hidden rounded-full border-[3px] border-red-600   align-middle">
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
			<h1 className="my-3 text-2xl tracking-wider">
				<SignedIn>
					{t("loggedIn")}
					<span className="capitalize">{user?.username}!</span>
				</SignedIn>
				<SignedOut>{t("notLoggedIn")}</SignedOut>
			</h1>
		</>
	);
}
