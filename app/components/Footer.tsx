"use client";
import { Flex, Separator } from "@radix-ui/themes";

export default function Footer() {
	return (
		<footer className="mx-auto flex w-full flex-col items-center justify-between border-t-2 bg-zinc-800  p-4 text-white lg:flex-row lg:justify-center">
			<nav className="flex flex-1 items-center ">
				<Flex align="center" className="gap-1 lg:gap-3">
					<p className="text-zinc-300">Rules</p>
					<Separator orientation="vertical" className="bg-zinc-300" />
					<p className="text-zinc-300">Privacy Policy</p>
					<Separator orientation="vertical" className="bg-zinc-300" />
					<p className="text-zinc-300">Contact</p>
				</Flex>
			</nav>

			<p className="text-zinc-300">©2024 N3XT SHOP</p>
		</footer>
	);
}
