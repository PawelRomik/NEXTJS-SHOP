"use client";

import { SignedOut, SignedIn, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function UserProfile() {
	return (
		<div className="flex items-center justify-center">
			<SignedIn>
				<Link className="text-3xl" href={"/user/settings"}>
					<i className="ri-user-line "></i>
				</Link>
			</SignedIn>
			<SignedOut>
				<div className="flex items-center justify-center font-bold">
					<SignUpButton />
				</div>
			</SignedOut>
		</div>
	);
}
