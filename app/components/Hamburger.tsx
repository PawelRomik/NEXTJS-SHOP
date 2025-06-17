"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { categories } from "../data/categories";
import HamburgerAccountSection from "./HamburgerAccountSection";
import { useTranslations } from "next-intl";
import { SignOutButton } from "@clerk/nextjs";
import SearchBar from "./SearchBar";
import SearchInput from "./SearchInput";
import HamburgerSearch from "./HamburgerSearch";

export default function Hamburger() {
	const [menuOn, setMenuOn] = useState(false);
	const t = useTranslations("categories");
	const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

	const path = usePathname();

	const isDirectSlug = ["new", "sale", "bundles"];

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
				<NavigationMenu.Root className="no-scrollbar fixed left-0 top-0 z-30 flex h-screen w-svw origin-left animate-showSearchbar flex-col overflow-y-auto bg-[rgb(20,20,20)] text-xl lg:hidden">
					<NavigationMenu.Item className="flex h-[60px] w-full list-none items-center justify-between bg-[rgb(11,11,11)] px-3 ">
						<button onClick={() => setMenuOn(false)}>
							<i className="ri-close-circle-line text-3xl text-red-600"></i>
						</button>
						<HamburgerSearch />
					</NavigationMenu.Item>
					<NavigationMenu.Item className="shadow-inset flex w-full flex-1 flex-col items-center justify-center border-b-4 border-red-800 pt-5">
						<HamburgerAccountSection />
					</NavigationMenu.Item>
					<NavigationMenu.List className="relative flex w-full  list-none flex-col gap-1 ">
						{categories.map((category) => (
							<NavigationMenu.Item key={category.id}>
								{category.subCategories ? (
									<div className="group w-full bg-[rgb(11,11,11)]">
										<button
											className={`w-full cursor-pointer bg-[rgb(11,11,11)] px-4 py-4 transition ${
												openCategoryId === category.id ? "bg-red-600" : ""
											}`}
											onClick={() =>
												setOpenCategoryId(openCategoryId === category.id ? null : category.id)
											}
										>
											<b className="flex w-full justify-between text-left">
												<span>{t(category.slug).toUpperCase()}</span>
												<span>
													<i
														className={`ri-arrow-right-s-line text-red-600 ${openCategoryId === category.id ? "hidden" : "inline"}`}
													></i>
													<i
														className={`ri-arrow-down-s-line  ${openCategoryId === category.id ? "inline" : "hidden"}`}
													></i>
												</span>
											</b>
										</button>
										{openCategoryId === category.id && (
											<div className="flex flex-col gap-2 pt-2 ">
												{category.subCategories.map((subCategory) => {
													const slug = subCategory.slug;
													const href = isDirectSlug.includes(slug)
														? `/${slug}`
														: `/category/${slug}`;
													return (
														<div
															key={slug}
															className="bg-[rgb(20,20,20)]  px-6 py-3 transition hover:text-red-600 focus:text-red-600"
														>
															<Link
																href={href}
																title={t(slug)}
																onClick={() => setMenuOn(false)}
																className="text-white"
															>
																<b>{t(slug)}</b>
															</Link>
														</div>
													);
												})}
											</div>
										)}
									</div>
								) : (
									<div className="bg-[rgb(11,11,11)] px-4 py-4">
										<Link
											href={`/category/${category.slug}`}
											onClick={() => setMenuOn(false)}
											title={t(category.slug)}
											className="font-bold "
										>
											{t(category.slug).toUpperCase()}
										</Link>
									</div>
								)}
							</NavigationMenu.Item>
						))}
					</NavigationMenu.List>
				</NavigationMenu.Root>
			)}
		</>
	);
}
