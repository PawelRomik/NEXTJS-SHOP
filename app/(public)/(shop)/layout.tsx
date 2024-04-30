import { Inter } from "next/font/google";
import nextLogo from "../../../public/logo.png";
import { Separator, Flex } from "@radix-ui/themes";
import Image from "next/image";
const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={`${inter.className} flex min-h-screen flex-col`}>
			<header className="sticky top-0 z-10 mx-auto flex w-full items-center justify-between border-b-2 bg-white p-4">
				<div className="block lg:hidden">
					<i className="ri-menu-line text-4xl"></i>
				</div>
				<div className="flex w-full items-center justify-center gap-2 lg:w-auto">
					<Image src={nextLogo} className="hidden w-12 lg:block" alt="shop logo" />
					<h1 className="text-4xl font-bold">N3XT SH0P</h1>
				</div>
				<nav className="hidden lg:block">
					<ul className="flex items-center justify-center gap-6">
						<li>FOR MEN</li>
						<li>FOR WOMEN</li>
						<li>NEW</li>
						<li>ON SALE</li>
					</ul>
				</nav>
				<div className="flex items-center justify-center">
					<button className="flex items-center justify-center gap-6">
						<div className="flex items-center justify-center">
							<input
								type="text"
								id="search"
								name="search"
								placeholder="Search"
								className="hidden h-full w-10 border-2 border-r-0 border-black p-2 outline-none lg:block lg:w-40"
							></input>
							<i className="ri-search-line pr-1 text-3xl lg:h-full lg:border-2 lg:border-l-0 lg:border-black"></i>
						</div>

						<i className="ri-account-circle-line text-3xl"></i>
					</button>
				</div>
			</header>
			{children}
			<footer className="mx-auto flex w-full items-center justify-between border-t-2 bg-zinc-800  p-4 text-white">
				<nav className="flex flex-1 items-center lg:justify-center">
					<Flex gap="3" align="center">
						<p className="text-zinc-300">Rules</p>
						<Separator orientation="vertical" className="bg-zinc-300" />
						<p className="text-zinc-300">Privacy Policy</p>
						<Separator orientation="vertical" className="bg-zinc-300" />
						<p className="text-zinc-300">Contact</p>
					</Flex>
				</nav>

				<p className="text-zinc-300">©2024 N3XT SHOP</p>
			</footer>
		</div>
	);
}
