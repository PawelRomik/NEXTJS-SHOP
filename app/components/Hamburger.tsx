"use client";
import Link from "next/link";
import nextLogo from "../../public/logo.png";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserProfile from "./UserProfile";
import { SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Hamburger() {
	const [menuOn, setMenuOn] = useState(false);
	const { user } = useUser();

	const path = usePathname();

	useEffect(() => {
		setMenuOn(false);
	}, [path]);

	return (
		<>
			<div className="flex items-center justify-start">
				<button className="flex lg:hidden" onClick={() => setMenuOn((prev) => !prev)}>
					<i className="ri-menu-line text-2xl"></i>
				</button>
			</div>
			{menuOn && (
				<NavigationMenu.Root className="fixed left-0 top-0 z-30 h-screen w-svw flex-1 flex-col justify-center text-2xl lg:hidden">
					<NavigationMenu.List className="one data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight m-0 flex h-screen  w-screen list-none flex-col items-start justify-start overflow-x-hidden border-2 bg-zinc-100">
						<NavigationMenu.Item className="fixed right-2 top-2">
							<button onClick={() => setMenuOn(false)}>
								<i className="ri-close-circle-line"></i>
							</button>
						</NavigationMenu.Item>

						<NavigationMenu.Item className="flex w-full flex-1 flex-col items-center justify-center gap-2 border-b-2 bg-white">
							<Image
								src={user?.imageUrl || nextLogo}
								alt="avatar"
								className="rounded-full border-2"
								width={100}
								height={100}
							/>
							<h1 className="text-xl">
								<SignedIn>Hello {user?.username}!</SignedIn>
								<SignedOut>Not Logged In!</SignedOut>
							</h1>
							<div className="flex w-full items-center justify-center gap-3">
								<SignedIn>
									<button className="flex w-[30%] items-center justify-center rounded-full border-2 bg-zinc-100 px-3 py-2 text-sm">
										Settings
									</button>
									<SignOutButton>
										<button className="flex w-[30%] items-center justify-center rounded-full border-2 bg-zinc-100 px-3 py-2 text-sm">
											Log out
										</button>
									</SignOutButton>
								</SignedIn>
								<SignedOut>
									<div className="flex w-[30%] items-center justify-center rounded-full border-2 bg-zinc-100 px-3 py-2 text-sm">
										<SignUpButton />
									</div>
								</SignedOut>
							</div>
						</NavigationMenu.Item>

						<NavigationMenu.Item className="w-full border-b-2 border-zinc-300 bg-white px-2 py-6">
							<NavigationMenu.Trigger className="w-full">
								<Link
									onClick={() => setMenuOn(false)}
									href="/shop/sale/"
									title="Sale"
									className="font-bold text-red-600"
								>
									<b className="flex w-full justify-between">
										<span className="bg-red-600 px-2 py-1 text-white">SALES</span>
										<span>
											<i className="ri-arrow-right-double-line"></i>
										</span>
									</b>
								</Link>
							</NavigationMenu.Trigger>
						</NavigationMenu.Item>

						<NavigationMenu.Item className="w-full border-b-2 border-zinc-300 bg-white px-2 py-6">
							<NavigationMenu.Trigger className="w-full">
								<Link
									onClick={() => setMenuOn(false)}
									href="/shop/new/"
									title="New"
									className="w-full"
								>
									<b className="flex w-full justify-between">
										<span>NEW</span>
										<span>
											<i className="ri-arrow-right-double-line"></i>
										</span>
									</b>
								</Link>
							</NavigationMenu.Trigger>
						</NavigationMenu.Item>

						<NavigationMenu.Item className="w-full border-b-2 border-zinc-300 bg-white px-2 py-6">
							<NavigationMenu.Trigger className="w-full">
								<Link onClick={() => setMenuOn(false)} href="/" title="All" className="w-full">
									<b className="flex w-full justify-between">
										<span>ALL</span>
										<span>
											<i className="ri-arrow-right-double-line"></i>
										</span>
									</b>
								</Link>
							</NavigationMenu.Trigger>
						</NavigationMenu.Item>
						<NavigationMenu.Item className="w-full border-b-2 border-zinc-300 bg-white px-2 py-6">
							<NavigationMenu.Trigger className="w-full">
								<b className="flex w-full justify-between">
									<span>MEN</span>
									<span>
										<i className="ri-arrow-right-double-line"></i>
									</span>
								</b>
							</NavigationMenu.Trigger>
							<NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight fixed left-0 top-0 flex h-[100%] w-screen flex-col items-start justify-start overflow-x-hidden  border-2 bg-zinc-100">
								<NavigationMenu.Trigger asChild={true}>
									<p
										className=" absolute right-0
						top-0 z-10 p-6 text-2xl text-black"
									>
										<i className="ri-arrow-go-back-line"></i>
									</p>
								</NavigationMenu.Trigger>

								<ul className="one m-0 grid w-full list-none grid-cols-1 gap-x-[10px] border-b-2 bg-white p-[22px]">
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/shoes/male"
											title="Shoes"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Shoes</b>
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/sneakers/male"
											title="Sneakers"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Sneakers
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/slides/male"
											title="Slides & Sandals"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Slides & Sandals
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/running/male"
											title="Running"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Running
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/walking/male"
											title="Walking"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Walking
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/hiking/male"
											title="Hiking"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hiking
										</Link>
									</li>
								</ul>
								<ul className=" two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] border-b-2 bg-white p-[22px]">
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/clothing/male"
											title="Clothing"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Clothing</b>
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/tshirt/male"
											title="T-Shirt & Tops"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											T-Shirt & Tops
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/hoodies/male"
											title="Hoodies"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hoodies
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/pants/male"
											title="Pants"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Pants
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/swimwear/male"
											title="Swimwear"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Swimwear
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/shorts/male"
											title="Shorts"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Shorts
										</Link>
									</li>
								</ul>
								<ul className=" two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] border-b-2 bg-white p-[22px]">
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/accesories/male"
											title="Accesories"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Accesories</b>
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/bags/male"
											title="Bags & Backpacks"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Bags & Backpacks
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/hats/male"
											title="Hats"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hats
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/gloves/male"
											title="Gloves"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Gloves
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/socks/male"
											title="Socks"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Socks
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/underwear/male"
											title="Underwear"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Underwear
										</Link>
									</li>
								</ul>
							</NavigationMenu.Content>
						</NavigationMenu.Item>
						<NavigationMenu.Item className="w-full border-zinc-300 bg-white px-2 py-6">
							<NavigationMenu.Trigger className="w-full">
								<b className="flex w-full justify-between">
									<span>WOMEN</span>
									<span>
										<i className="ri-arrow-right-double-line"></i>
									</span>
								</b>
							</NavigationMenu.Trigger>
							<NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight fixed left-0 top-0 flex h-[100%] w-screen flex-col items-start justify-start overflow-x-hidden overflow-y-scroll  border-2 bg-zinc-100">
								<NavigationMenu.Trigger asChild={true}>
									<p
										className=" absolute right-0
						top-0 z-10 p-6 text-2xl text-black"
									>
										<i className="ri-arrow-go-back-line"></i>
									</p>
								</NavigationMenu.Trigger>

								<ul className=" two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] border-b-2 bg-white p-[22px]">
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/shoes/female"
											title="Shoes"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Shoes</b>
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/sneakers/female"
											title="Sneakers"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Sneakers
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/slides/female"
											title="Slides"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Slides & Sandals
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/running/female"
											title="Running"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Running
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/walking/female"
											title="Walking"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Walking
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/hiking/female"
											title="Hiking"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hiking
										</Link>
									</li>
								</ul>
								<ul className=" two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] border-b-2 bg-white p-[22px]">
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/clothing/female"
											title="Clothing"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Clothing</b>
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/tshirt/female"
											title="T-Shirt & Tops"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											T-Shirt & Tops
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/hoodies/female"
											title="Hoodies"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hoodies
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/pants/female"
											title="Pants"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Pants
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/tights/female"
											title="Tights & Leggings"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Tights & Leggings
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/dresses/female"
											title="Dresses & Skirts"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Dresses & Skirts
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/swimwear/female"
											title="Swimwear"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Swimwear
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/shorts/female"
											title="Shorts"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Shorts
										</Link>
									</li>
								</ul>
								<ul className=" two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] border-b-2 bg-white p-[22px]">
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/accesories/female"
											title="Accesories"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Accesories</b>
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/bags/female"
											title="Bags & Backpacks"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Bags & Backpacks
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/hats/female"
											title="Hats"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hats
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/gloves/female"
											title="Gloves"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Gloves
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/socks/female"
											title="Socks"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Socks
										</Link>
									</li>
									<li>
										<Link
											onClick={() => setMenuOn(false)}
											href="/shop/underwear/female"
											title="Underwear"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Underwear
										</Link>
									</li>
								</ul>
							</NavigationMenu.Content>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			)}
		</>
	);
}
