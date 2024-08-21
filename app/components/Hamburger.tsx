"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { categories } from "../data/categories";
import HamburgerAccountSection from "./HamburgerAccountSection";
import { useTranslations } from "next-intl";

export default function Hamburger() {
	const [menuOn, setMenuOn] = useState(false);
	const t = useTranslations("categories");

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
				<NavigationMenu.Root className="fixed left-0 top-0 z-30 h-screen w-svw flex-1 origin-left animate-showSearchbar flex-col justify-center text-2xl lg:hidden">
					<NavigationMenu.List className="m-0 flex h-screen  w-screen list-none flex-col items-start justify-start overflow-x-hidden border-2 border-zinc-900 bg-black">
						<NavigationMenu.Item className="fixed right-2 top-2">
							<button onClick={() => setMenuOn(false)}>
								<i className="ri-close-circle-line text-red-600"></i>
							</button>
						</NavigationMenu.Item>

						<NavigationMenu.Item className="flex w-full flex-1 flex-col items-center justify-center gap-2 border-b-2 border-zinc-900 bg-black">
							<HamburgerAccountSection />
						</NavigationMenu.Item>

						{categories.map((category) => (
							<NavigationMenu.Item
								key={category.id}
								className="w-full border-b-2 border-zinc-900 bg-black px-2 py-6"
							>
								<NavigationMenu.Trigger className="w-full">
									<b className="flex w-full justify-between">
										<span className="pl-2">{t(category.slug).toUpperCase()}</span>
										{category.subCategories && (
											<span>
												<i className="ri-arrow-right-double-line text-red-600"></i>
											</span>
										)}
									</b>
								</NavigationMenu.Trigger>
								{category.subCategories && (
									<NavigationMenu.Content className="fixed left-0 top-0 flex h-screen w-screen flex-col items-start justify-start overflow-x-hidden border-zinc-900 bg-black">
										<NavigationMenu.Trigger>
											<p className="absolute right-10 top-2 z-10 text-black">
												<i className="ri-arrow-go-back-line z-20 text-red-600"></i>
											</p>
										</NavigationMenu.Trigger>
										<NavigationMenu.Item className="fixed right-2 top-2 z-20">
											<button onClick={() => setMenuOn(false)}>
												<i className="ri-close-circle-line text-red-600"></i>
											</button>
										</NavigationMenu.Item>

										<NavigationMenu.Sub className="h-full w-full origin-left animate-showSearchbar border-2 border-zinc-900">
											<NavigationMenu.List className="w-full">
												<NavigationMenu.Item>
													<h2 className="border-b-2 border-red-600 px-2 py-2 pl-4 text-red-600">
														{t(category.slug)}
													</h2>
												</NavigationMenu.Item>
												{category.subCategories.map((subCategory) => {
													const href = subCategory.slug;
													return (
														<NavigationMenu.Item
															key={subCategory.slug}
															className="w-full border-b-2 border-zinc-900 bg-black px-2 py-[1.25rem]"
														>
															<Link
																onClick={() => setMenuOn(false)}
																href={`/category/${href}`}
																title={t(subCategory.slug)}
																className=" pl-2"
															>
																<b>{t(subCategory.slug)}</b>
															</Link>
														</NavigationMenu.Item>
													);
												})}
											</NavigationMenu.List>
										</NavigationMenu.Sub>
									</NavigationMenu.Content>
								)}
							</NavigationMenu.Item>
						))}
					</NavigationMenu.List>
				</NavigationMenu.Root>
			)}
		</>
	);
}
