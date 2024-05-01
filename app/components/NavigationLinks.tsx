"use client";
import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export default function NavigationLinks() {
	return (
		<NavigationMenu.Root className="relative z-[1] hidden w-svw flex-1 justify-center lg:flex">
			<NavigationMenu.List className="flex items-center justify-center gap-6  overflow-hidden">
				<NavigationMenu.Item>
					<NavigationMenu.Trigger className="focus:shadow-violet7 hover:border-b-2 hover:border-black">
						<Link href="#" title="Shoes">
							NEW
						</Link>
					</NavigationMenu.Trigger>
				</NavigationMenu.Item>

				<NavigationMenu.Item>
					<NavigationMenu.Trigger className="focus:shadow-violet7 hover:border-b-2 hover:border-black">
						<Link href="#" title="Shoes">
							ALL
						</Link>
					</NavigationMenu.Trigger>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger className="focus:shadow-violet7 hover:border-b-2 hover:border-black">
						FOR MEN
					</NavigationMenu.Trigger>
					<NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight fixed left-0 top-[5rem] flex w-screen items-start justify-center gap-6 overflow-x-hidden  border-2 bg-zinc-100">
						<ul className="one m-0 grid w-[200px] list-none grid-cols-1 gap-x-[10px] p-[22px]">
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									<b>Shoes</b>
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Sneakers
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Slides & Sandals
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Running
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Walking
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Hiking
								</Link>
							</li>
						</ul>
						<ul className="two m-0 grid w-[200px] list-none grid-cols-1 gap-x-[10px] p-[22px]">
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									<b>Clothing</b>
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									T-Shirt & Tops
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Hoodies
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Pants
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Swimwear
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Shorts
								</Link>
							</li>
						</ul>
						<ul className="two m-0 grid w-[200px] list-none grid-cols-1 gap-x-[10px] p-[22px]">
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									<b>Accesories</b>
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Bags & Backpacks
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Hats
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Gloves
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Socks
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Underwear
								</Link>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger className="focus:shadow-violet7 hover:border-b-2 hover:border-black">
						FOR WOMEN
					</NavigationMenu.Trigger>
					<NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight fixed left-0 top-[5rem] flex w-screen items-start justify-center gap-6 overflow-x-hidden  border-2 bg-zinc-100">
						<ul className="two m-0 grid w-[200px] list-none grid-cols-1 gap-x-[10px] p-[22px]">
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									<b>Shoes</b>
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Sneakers
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Slides & Sandals
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Running
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Walking
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Hiking
								</Link>
							</li>
						</ul>
						<ul className="two m-0 grid w-[200px] list-none grid-cols-1 gap-x-[10px] p-[22px]">
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									<b>Clothing</b>
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									T-Shirt & Tops
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Hoodies
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Pants
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Tights & Leggings
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Dresses & Skirts
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Swimwear
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Shorts
								</Link>
							</li>
						</ul>
						<ul className="two m-0 grid w-[200px] list-none grid-cols-1 gap-x-[10px] p-[22px]">
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									<b>Accesories</b>
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Bags & Backpacks
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Hats
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Gloves
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Socks
								</Link>
							</li>
							<li>
								<Link
									href="#"
									title="Shoes"
									className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
								>
									Underwear
								</Link>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>

				<NavigationMenu.Item>
					<NavigationMenu.Trigger className="focus:shadow-violet7 hover:border-b-2 hover:border-black">
						<Link href="#" title="Shoes">
							ON SALE
						</Link>
					</NavigationMenu.Trigger>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
