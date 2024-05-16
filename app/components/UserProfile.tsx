"use client";

import { SignedOut, SignedIn, SignUpButton, UserButton } from "@clerk/nextjs";

export default function UserProfile() {
	return (
		<div className="ml-4 flex items-center justify-center">
			<SignedIn>
				<div className="flex items-center justify-center rounded-full border-2 border-black">
					<UserButton />
				</div>
			</SignedIn>
			<SignedOut>
				<div className="ml-2 flex items-center justify-center font-bold">
					<SignUpButton />
				</div>
			</SignedOut>
		</div>
	);
}
