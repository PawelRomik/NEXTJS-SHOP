"use client";

import { SignedOut, SignedIn, SignInButton, useClerk, SignOutButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserProfile() {
	const t = useTranslations();
	const { user } = useClerk();
	const [username, setUsername] = useState("");
	const [image, setImage] = useState("");

	const refreshData = async (open?: boolean) => {
		if (open) {
			await user?.reload();
			if (user?.imageUrl) setImage(user?.imageUrl);
			if (user?.username) setUsername(user?.username);
		}
	};

	refreshData(true);

	return (
		<div className="flex items-center justify-center">
			<SignedIn>
				<DropdownMenu.Root onOpenChange={(open) => refreshData(open)}>
					<DropdownMenu.Trigger className="text-3xl outline-none">
						<Avatar.Root className="inline-flex size-[34px] select-none items-center justify-center overflow-hidden  align-middle">
							<i className="ri-user-line"></i>
						</Avatar.Root>
					</DropdownMenu.Trigger>

					<DropdownMenu.Portal>
						<DropdownMenu.Content
							className="min-w-[220px] origin-top animate-showNav border-[3px] border-red-600 bg-[rgb(20,20,20)] text-white "
							sideOffset={5}
						>
							<DropdownMenu.Item className="group relative flex select-none items-start rounded-[3px] bg-[rgb(12,12,12)]  p-5 text-[14px] leading-none outline-none ">
								<div className="flex w-full flex-col items-center justify-center gap-3 ">
									<Avatar.Root className="inline-flex size-[70px] select-none items-center justify-center overflow-hidden rounded-full border-2 border-red-600 align-middle">
										<Avatar.Image
											className="size-full rounded-[inherit] object-cover"
											src={user?.imageUrl}
											alt="avatar"
										/>
										<Avatar.Fallback
											className="leading-1 flex size-full items-center justify-center bg-zinc-800 text-[15px] font-medium text-white"
											delayMs={600}
										>
											{username.substring(0, 2).toUpperCase()}
										</Avatar.Fallback>
									</Avatar.Root>
									<p className="text-[12px]">
										<span className="font-bold uppercase italic">{username}</span>
									</p>
								</div>
							</DropdownMenu.Item>

							<Link
								href={"/user/settings"}
								className="group relative mt-3 flex w-full items-center justify-center gap-1 bg-[rgb(12,12,12)]   "
							>
								<DropdownMenu.Item className="flex h-[25px] w-full cursor-pointer select-none items-center justify-start rounded-[3px] bg-[rgb(12,12,12)] py-5 pl-3 text-[14px]   leading-none outline-none transition hover:bg-red-600 ">
									<div className="flex items-center justify-center gap-1">
										<i className="ri-settings-2-line"></i> {t("hamburger.settings")}
									</div>
								</DropdownMenu.Item>
							</Link>

							<Link
								href={"/user/orders"}
								className="group relative mt-1 flex w-full items-center justify-center gap-1 bg-[rgb(12,12,12)] "
							>
								<DropdownMenu.Item className="flex h-[25px] w-full cursor-pointer select-none  items-center justify-start rounded-[3px] py-5 pl-3 text-[14px] leading-none outline-none transition hover:bg-red-600 ">
									<div className="flex items-center justify-center gap-1">
										<i className="ri-file-list-3-line"></i> {t("order.history")}
									</div>
								</DropdownMenu.Item>
							</Link>

							<DropdownMenu.Item
								className="group absolute right-0 top-2 flex h-[25px] cursor-pointer select-none items-start rounded-[3px] p-[5px] px-[15px] text-[18px] leading-none text-red-600 outline-none transition hover:text-red-400"
								aria-label="Close"
							>
								<i className="ri-close-circle-line"></i>
							</DropdownMenu.Item>

							<SignOutButton>
								<button className="group relative mt-3 flex w-full items-center  justify-center bg-[rgb(12,12,12)] ">
									<DropdownMenu.Item className="flex h-[25px] w-full cursor-pointer select-none justify-start rounded-[3px] py-5  pl-3 text-[14px]  leading-none outline-none transition hover:bg-red-600 ">
										<div className="flex items-center justify-center gap-1">
											<i className="ri-logout-box-r-line"></i> {t("hamburger.logOut")}
										</div>
									</DropdownMenu.Item>
								</button>
							</SignOutButton>

							<DropdownMenu.Arrow width={20} height={10} className="fill-red-600" />
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu.Root>
			</SignedIn>
			<SignedOut>
				<div className="flex items-center justify-center font-bold">
					<SignInButton>{t("sign.signIn")}</SignInButton>
				</div>
			</SignedOut>
		</div>
	);
}
