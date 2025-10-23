"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import UserAvatar from "./UserAvatar";
import UserMenuitem from "./UserMenuItem";
import UserMenuCloseButton from "./UserMenuCloseButton";
import UserSignOut from "./UserSignOut";
import UserTrigger from "./UserTrigger";

export default function UserProfile() {
	const t = useTranslations();
	const { user, isSignedIn } = useUser();

	if (!isSignedIn || !user) {
		return (
			<div className="flex items-center justify-center font-bold">
				<SignInButton>{t("sign.signIn")}</SignInButton>
			</div>
		);
	}

	const handleOpenChange = (open: boolean) => {
		if (open) user.reload();
	};

	return (
		<div className="flex items-center justify-center">
			<DropdownMenu.Root onOpenChange={handleOpenChange}>
				<UserTrigger />

				<DropdownMenu.Portal>
					<DropdownMenu.Content
						className="min-w-[220px] origin-top animate-showNav border-[3px] border-red-600 bg-[rgb(20,20,20)] text-white "
						sideOffset={5}
					>
						<UserAvatar username={user.username} imageUrl={user.imageUrl} />
						<UserMenuitem
							href="/user/settings"
							icon="ri-settings-2-line"
							label={t("hamburger.settings")}
						/>
						<UserMenuitem
							href="/user/orders"
							icon="ri-file-list-3-line"
							label={t("order.history")}
						/>

						<UserMenuCloseButton />
						<UserSignOut />

						<DropdownMenu.Arrow width={20} height={10} className="fill-red-600" />
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	);
}
