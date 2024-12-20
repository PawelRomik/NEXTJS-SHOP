"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { categories } from "../data/categories";
import HamburgerAccountSection from "./HamburgerAccountSection";
import { useTranslations } from "next-intl";
import { SignOutButton } from "@clerk/nextjs";

export default function Hamburger() {
	const [menuOn, setMenuOn] = useState(false);
	const t = useTranslations("categories");

	const path = usePathname();

	useEffect(() => {
		setMenuOn(false);
	}, [path]);

	return (
		<>
			<div className=" flex  items-center justify-start">
				<button className="flex lg:hidden" onClick={() => setMenuOn((prev) => !prev)}>
					<i className="ri-menu-line text-2xl"></i>
				</button>
			</div>
			{menuOn && (
				<NavigationMenu.Root className="no-scrollbar fixed left-0 top-0 z-30  h-screen min-h-screen w-svw origin-left animate-showSearchbar flex-col justify-center  overflow-y-auto overflow-x-hidden  text-xl lg:hidden">
					<NavigationMenu.Item className="height-fix flex w-screen flex-1 flex-col items-center justify-center  gap-2 overflow-auto border-b-4 border-red-800 bg-black">
						<HamburgerAccountSection />
					</NavigationMenu.Item>
					<NavigationMenu.List className="z-30 m-0 w-screen list-none overflow-y-auto   overflow-x-hidden  bg-zinc-900">
						<NavigationMenu.Item className="fixed right-2 top-2">
							<button onClick={() => setMenuOn(false)}>
								<i className="ri-close-circle-line text-red-600"></i>
							</button>
						</NavigationMenu.Item>

						{categories.map((category) => (
							<NavigationMenu.Item
								key={category.id}
								className="block w-full border-b-2 border-zinc-800 bg-zinc-900"
							>
								{category.subCategories ? (
									<details className=" group w-full bg-zinc-900  ">
										<summary className=" cursor-pointer list-none px-2 pb-3 pt-5 text-red-600">
											<b className="flex w-full justify-between">
												<span className="pl-2">{t(category.slug).toUpperCase()}</span>
												{category.subCategories && (
													<span>
														<i className="ri-arrow-right-s-line text-red-600 group-open:hidden"></i>
														<i className="ri-arrow-down-s-line hidden text-red-600 group-open:block"></i>
													</span>
												)}
											</b>
										</summary>
										<div className="flex flex-col gap-1">
											{category.subCategories.map((subCategory) => {
												const href = subCategory.slug;
												return (
													<div key={subCategory.slug} className="w-full bg-zinc-800 px-2 py-[1rem]">
														<Link
															onClick={() => setMenuOn(false)}
															href={`/category/${href}`}
															title={t(subCategory.slug)}
															className="pl-2"
														>
															<b>{t(subCategory.slug)}</b>
														</Link>
													</div>
												);
											})}
										</div>
									</details>
								) : (
									<div key={category.slug} className="w-full  bg-zinc-900 px-2 py-4">
										<Link
											href={`/category/${category.slug}`}
											onClick={() => setMenuOn(false)}
											title={t(category.slug)}
											className="cursor-pointer list-none px-2  pb-3 pt-5 font-bold text-red-600"
										>
											{t(category.slug).toUpperCase()}
										</Link>
									</div>
								)}
							</NavigationMenu.Item>
						))}
						<NavigationMenu.Item className="w-full border-b-2 border-zinc-800 bg-zinc-900">
							<div className="w-full  bg-zinc-900 px-2 py-4">
								<Link
									href={`/user/settings`}
									onClick={() => setMenuOn(false)}
									title={t("settings")}
									className="cursor-pointer list-none px-2  py-5 font-bold text-red-600"
								>
									{t("settings").toUpperCase()}
								</Link>
							</div>
						</NavigationMenu.Item>
						<NavigationMenu.Item className="w-full bg-zinc-900">
							<div className="w-full  bg-zinc-900 px-2 py-4">
								<SignOutButton>
									<button
										onClick={() => setMenuOn(false)}
										title={t("logOut")}
										className="cursor-pointer list-none px-2  py-5 font-bold text-red-600"
									>
										{t("logOut").toUpperCase()}
									</button>
								</SignOutButton>
							</div>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			)}
		</>
	);
}
