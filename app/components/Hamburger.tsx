"use client";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Hamburger() {
	const [menuOn, setMenuOn] = useState(false);

	const path = usePathname();
	const searchparams = useSearchParams();

	useEffect(() => {
		setMenuOn(false);
	}, [path, searchparams]);

	return (
		<>
			<button className="block lg:hidden" onClick={() => setMenuOn((prev) => !prev)}>
				<i className="ri-menu-line text-2xl"></i>
			</button>
			{menuOn && (
				<NavigationMenu.Root className="absolute bottom-0 left-0 w-svw flex-1 translate-y-full flex-col justify-center text-2xl lg:hidden">
					<NavigationMenu.List className="one data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight m-0 grid h-[50%]  w-screen list-none grid-cols-1 flex-col items-start justify-start gap-6 gap-x-[10px] overflow-x-hidden border-2 bg-zinc-100 p-[22px]">
						<NavigationMenu.Item>
							<NavigationMenu.Trigger>
								<Link href="/shop/new/" title="New">
									<b>NEW</b>
								</Link>
							</NavigationMenu.Trigger>
						</NavigationMenu.Item>

						<NavigationMenu.Item>
							<NavigationMenu.Trigger>
								<Link href="/" title="All">
									<b>ALL</b>
								</Link>
							</NavigationMenu.Trigger>
						</NavigationMenu.Item>
						<NavigationMenu.Item>
							<NavigationMenu.Trigger>
								<b>MEN</b>
							</NavigationMenu.Trigger>
							<NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute left-0 top-0 flex h-[200%] w-screen flex-col items-start justify-start gap-6 overflow-x-hidden  border-2 bg-zinc-100">
								<NavigationMenu.Trigger asChild={true}>
									<p
										className=" absolute right-0
						top-0 z-10 p-6 text-2xl text-black"
									>
										<i className="ri-arrow-go-back-line"></i>
									</p>
								</NavigationMenu.Trigger>

								<ul className="one m-0 grid w-full list-none grid-cols-1 gap-x-[10px] p-[22px]">
									<li>
										<Link
											href="/shop/shoes/male"
											title="Shoes"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Shoes</b>
										</Link>
									</li>
									<li>
										<Link
											href="/shop/sneakers/male"
											title="Sneakers"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Sneakers
										</Link>
									</li>
									<li>
										<Link
											href="/shop/slides/male"
											title="Slides & Sandals"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Slides & Sandals
										</Link>
									</li>
									<li>
										<Link
											href="/shop/running/male"
											title="Running"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Running
										</Link>
									</li>
									<li>
										<Link
											href="/shop/walking/male"
											title="Walking"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Walking
										</Link>
									</li>
									<li>
										<Link
											href="/shop/hiking/male"
											title="Hiking"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hiking
										</Link>
									</li>
								</ul>
								<ul className="two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] p-[22px]">
									<li>
										<Link
											href="/shop/clothing/male"
											title="Clothing"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Clothing</b>
										</Link>
									</li>
									<li>
										<Link
											href="/shop/tshirt/male"
											title="T-Shirt & Tops"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											T-Shirt & Tops
										</Link>
									</li>
									<li>
										<Link
											href="/shop/hoodies/male"
											title="Hoodies"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hoodies
										</Link>
									</li>
									<li>
										<Link
											href="/shop/pants/male"
											title="Pants"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Pants
										</Link>
									</li>
									<li>
										<Link
											href="/shop/swimwear/male"
											title="Swimwear"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Swimwear
										</Link>
									</li>
									<li>
										<Link
											href="/shop/shorts/male"
											title="Shorts"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Shorts
										</Link>
									</li>
								</ul>
								<ul className="two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] p-[22px]">
									<li>
										<Link
											href="/shop/accesories/male"
											title="Accesories"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Accesories</b>
										</Link>
									</li>
									<li>
										<Link
											href="/shop/bags/male"
											title="Bags & Backpacks"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Bags & Backpacks
										</Link>
									</li>
									<li>
										<Link
											href="/shop/hats/male"
											title="Hats"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hats
										</Link>
									</li>
									<li>
										<Link
											href="/shop/gloves/male"
											title="Gloves"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Gloves
										</Link>
									</li>
									<li>
										<Link
											href="/shop/socks/male"
											title="Socks"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Socks
										</Link>
									</li>
									<li>
										<Link
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
						<NavigationMenu.Item>
							<NavigationMenu.Trigger>
								<b>WOMEN</b>
							</NavigationMenu.Trigger>
							<NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute left-0 top-0 flex h-[200%] w-screen flex-col items-start justify-start gap-6 overflow-x-hidden  border-2 bg-zinc-100">
								<NavigationMenu.Trigger asChild={true}>
									<p
										className=" absolute right-0
						top-0 z-10 p-6 text-2xl text-black"
									>
										<i className="ri-arrow-go-back-line"></i>
									</p>
								</NavigationMenu.Trigger>

								<ul className="two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] p-[22px]">
									<li>
										<Link
											href="/shop/shoes/female"
											title="Shoes"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Shoes</b>
										</Link>
									</li>
									<li>
										<Link
											href="/shop/sneakers/female"
											title="Sneakers"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Sneakers
										</Link>
									</li>
									<li>
										<Link
											href="/shop/slides/female"
											title="Slides"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Slides & Sandals
										</Link>
									</li>
									<li>
										<Link
											href="/shop/running/female"
											title="Running"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Running
										</Link>
									</li>
									<li>
										<Link
											href="/shop/walking/female"
											title="Walking"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Walking
										</Link>
									</li>
									<li>
										<Link
											href="/shop/hiking/female"
											title="Hiking"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hiking
										</Link>
									</li>
								</ul>
								<ul className="two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] p-[22px]">
									<li>
										<Link
											href="/shop/clothing/female"
											title="Clothing"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Clothing</b>
										</Link>
									</li>
									<li>
										<Link
											href="/shop/tshirt/female"
											title="T-Shirt & Tops"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											T-Shirt & Tops
										</Link>
									</li>
									<li>
										<Link
											href="/shop/hoodies/female"
											title="Hoodies"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hoodies
										</Link>
									</li>
									<li>
										<Link
											href="/shop/pants/female"
											title="Pants"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Pants
										</Link>
									</li>
									<li>
										<Link
											href="/shop/tights/female"
											title="Tights & Leggings"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Tights & Leggings
										</Link>
									</li>
									<li>
										<Link
											href="/shop/dresses/female"
											title="Dresses & Skirts"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Dresses & Skirts
										</Link>
									</li>
									<li>
										<Link
											href="/shop/swimwear/female"
											title="Swimwear"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Swimwear
										</Link>
									</li>
									<li>
										<Link
											href="/shop/shorts/female"
											title="Shorts"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Shorts
										</Link>
									</li>
								</ul>
								<ul className="two m-0 grid w-full list-none grid-cols-1 gap-x-[10px] p-[22px]">
									<li>
										<Link
											href="/shop/accesories/female"
											title="Accesories"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											<b>Accesories</b>
										</Link>
									</li>
									<li>
										<Link
											href="/shop/bags/female"
											title="Bags & Backpacks"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Bags & Backpacks
										</Link>
									</li>
									<li>
										<Link
											href="/shop/hats/female"
											title="Hats"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Hats
										</Link>
									</li>
									<li>
										<Link
											href="/shop/gloves/female"
											title="Gloves"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Gloves
										</Link>
									</li>
									<li>
										<Link
											href="/shop/socks/female"
											title="Socks"
											className="focus:shadow-violet7 hover:border-b-2 hover:border-black"
										>
											Socks
										</Link>
									</li>
									<li>
										<Link
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

						<NavigationMenu.Item>
							<NavigationMenu.Trigger>
								<Link href="/shop/sale/" title="Shoes">
									<b>SALE</b>
								</Link>
							</NavigationMenu.Trigger>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			)}
		</>
	);
}
