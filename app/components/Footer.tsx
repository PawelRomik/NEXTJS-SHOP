import { Flex, Separator } from "@radix-ui/themes";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mx-auto flex w-full flex-col items-center justify-between bg-zinc-800  p-4 text-white lg:flex-row lg:justify-center">
			<nav className="flex flex-1 items-center ">
				<Flex align="center" className="gap-1 lg:gap-3">
					<Link href="/rules" title="rules" className="text-zinc-300">
						Rules
					</Link>
					<Separator orientation="vertical" className="bg-zinc-300" />
					<Link href="/privacy" title="rules" className="text-zinc-300">
						Privacy Policy
					</Link>
					<Separator orientation="vertical" className="bg-zinc-300" />
					<Link href="/contact" title="rules" className="text-zinc-300">
						Contact
					</Link>
				</Flex>
			</nav>

			<p className="text-zinc-300">©2024 N3XT SHOP</p>
		</footer>
	);
}
