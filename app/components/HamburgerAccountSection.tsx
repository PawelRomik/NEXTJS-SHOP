import { SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import nextLogo from "../../public/logo.png";
import { useUser } from "@clerk/nextjs";

export default function HamburgerAccountSection() {
	const { user } = useUser();

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
				<SignedIn>Hello {user?.username}!</SignedIn>
				<SignedOut>Not Logged In!</SignedOut>
			</h1>
			<div className="flex w-full items-center justify-center gap-3">
				<SignedIn>
					<button className="flex w-[30%] items-center justify-center rounded-full border-2 border-red-600 bg-black px-3 py-2 text-sm">
						Settings
					</button>
					<SignOutButton>
						<button className="flex w-[30%] items-center justify-center rounded-full border-2 border-red-600 bg-black px-3 py-2 text-sm">
							Log out
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
