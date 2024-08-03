"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { categories } from "../data/categories";

export default function NavigationLinks() {
	return (
		<NavigationMenu.Root className="relative z-[1] hidden w-svw flex-1 justify-center lg:flex">
			<NavigationMenu.List className="flex items-center justify-center gap-6 overflow-hidden">
				{categories.map((category) => (
					<NavigationMenu.Item key={category.id}>
						<NavigationMenu.Trigger
							className={`text-white hover:text-red-600 data-[state=open]:text-red-600`}
						>
							<Link href={`/${category.name.toLowerCase()}`} title={category.name}>
								{category.name.toUpperCase()}
							</Link>

							{category.subCategories && <i className="ri-arrow-drop-down-line"></i>}
						</NavigationMenu.Trigger>
						{category.subCategories && (
							<NavigationMenu.Content className="fixed left-0 top-[5rem] flex w-screen origin-top animate-showNav items-start justify-center gap-6 overflow-hidden overflow-x-hidden border-b-[3px] border-b-red-600 bg-zinc-900">
								<div className="m-0 flex w-1/3 flex-col gap-2 p-[22px] ">
									<div className="relative">
										<h2 className="w-auto text-zinc-400">{category.name}</h2>
										<NavigationMenu.Trigger
											className="absolute right-2 top-0 text-2xl"
											onPointerMove={(event) => event.preventDefault()}
											onPointerLeave={(event) => event.preventDefault()}
										>
											<button className="hover:text-red-600">
												<i className="ri-close-line"></i>
											</button>
										</NavigationMenu.Trigger>
									</div>
									<ul className="text-md relative flex w-full flex-col items-start justify-start gap-2">
										{category.subCategories.map((subCategory) => (
											<li key={subCategory} className="">
												<Link
													href={`/category/${subCategory
														.toLowerCase()
														.replace(/\s*\(.*?\)\s*/g, "")
														.replace(/ /g, "-")}`}
													title={subCategory}
													className="group"
												>
													<span className="group-hover:border-b-2 group-hover:border-red-600 group-hover:text-red-600">
														{subCategory}
													</span>
													<i className="ri-arrow-drop-right-line group-hover:text-red-600"></i>
												</Link>
											</li>
										))}
									</ul>
								</div>
							</NavigationMenu.Content>
						)}
					</NavigationMenu.Item>
				))}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
