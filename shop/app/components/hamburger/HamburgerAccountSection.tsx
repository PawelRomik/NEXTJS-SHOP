"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import HamburgerSignedIn from "./HamburgerSignedIn";
import HamburgerSignedOut from "./HamburgerSignedOut";
import HamburgerAvatar from "./HamburgerAvatar";

export default function HamburgerAccountSection() {
	const { user } = useUser();

	return (
		<div className="flex h-full flex-col items-center justify-center gap-3 md:gap-5">
			<SignedIn>
				<h1 className="text-3xl font-bold uppercase md:text-5xl ">{user?.username}</h1>
			</SignedIn>
			<HamburgerAvatar username={user?.username} image={user?.imageUrl} />
			<div className="mb-3 text-2xl tracking-wider">
				<SignedIn>
					<HamburgerSignedIn />
				</SignedIn>
				<SignedOut>
					<HamburgerSignedOut />
				</SignedOut>
			</div>
		</div>
	);
}
