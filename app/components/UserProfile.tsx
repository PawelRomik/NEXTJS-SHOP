"use client";

import { SignedOut, SignedIn, SignUpButton } from "@clerk/nextjs";

export default function UserProfile() {
	return (
		<div className="flex items-center justify-center">
			<SignedIn>
				<i className="ri-user-line text-3xl"></i>
			</SignedIn>
			<SignedOut>
				<div className="flex items-center justify-center font-bold">
					<SignUpButton />
				</div>
			</SignedOut>
		</div>
	);
}
