import { Flex, Separator } from "@radix-ui/themes";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="flex w-full flex-col items-center justify-between gap-2 border-t-8 border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300 lg:flex-row lg:gap-0">
			<p className="lg:w-1/3">Copyright © 2024 Ephonix Inc. All rights reserved.</p>
			<nav className="flex items-center justify-center gap-3 lg:w-1/3">
				<Link href="/terms" title="terms and conditions" className="hover:text-white">
					Terms and Conditions
				</Link>
				<Separator orientation="vertical" className="bg-zinc-300" />
				<Link href="/privacy" title="rules" className="hover:text-white">
					Privacy Policy
				</Link>
				<Separator orientation="vertical" className="bg-zinc-300" />
				<Link href="/contact" title="rules" className="hover:text-white">
					Contact
				</Link>
			</nav>
			<hr className="h-[2px] w-full border-none bg-zinc-800 lg:hidden"></hr>
			<div className="flex items-center justify-end lg:w-1/3">
				<ul className="flex items-center justify-end gap-2 text-2xl">
					<li>
						<Link
							href={"https://www.facebook.com"}
							title="Our Facebook profile"
							className="hover:text-white"
						>
							<i className="ri-facebook-box-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://www.instagram.com"}
							title="Our Instagram profile"
							className="hover:text-white"
						>
							<i className="ri-instagram-fill"></i>
						</Link>
					</li>
					<li>
						<Link href={"https://x.com"} title="Our X profile" className="hover:text-white">
							<i className="ri-twitter-x-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://www.youtube.com"}
							title="Our Youtube channel"
							className="hover:text-white"
						>
							<i className="ri-youtube-fill"></i>
						</Link>
					</li>
					<li>
						<Link
							href={"https://discord.com"}
							title="Our Discord server"
							className="hover:text-white"
						>
							<i className="ri-discord-fill"></i>
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}
