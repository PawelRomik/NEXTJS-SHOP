"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { GET_CATEGORY_IMAGE } from "../queries/category";
import nextLogo from "../../public/logo.png";
import { useTranslations } from "next-intl";
import { categories } from "../data/categories";
import createApolloClient from "../../apollo-client";
import { CategoryData } from "../queries/productType";
import { ApolloQueryResult } from "@apollo/client";

export default function NavigationLinks() {
	const t = useTranslations("categories");
	const [imageSrc, setImageSrc] = useState<string>("");

	const changeImageSrc = async (category: string) => {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<CategoryData> = await client.query({
				query: GET_CATEGORY_IMAGE,
				variables: {
					slug: category
				}
			});
			const dataUrl = data.categories.data[0]?.attributes.image.data.attributes.url;
			setImageSrc(`${process.env.NEXT_PUBLIC_PROD_PATH}${dataUrl}`);
		} catch (err) {
			setImageSrc("");
		}
	};

	const isDirectSlug = ["new", "sale", "bundles"];

	return (
		<NavigationMenu.Root className="relative z-[1] hidden w-svw flex-1 justify-center lg:flex">
			<NavigationMenu.List className="flex items-center justify-center gap-6 overflow-hidden">
				{categories.map((category) => (
					<NavigationMenu.Item key={category.id}>
						<NavigationMenu.Trigger className="font-bold text-white hover:text-red-600 data-[state=open]:text-red-600">
							<Link href={`/${category.slug}`} title={t(category.slug)}>
								{t(category.slug).toUpperCase()}
							</Link>
							{category.subCategories && <i className="ri-arrow-drop-down-line"></i>}
						</NavigationMenu.Trigger>
						{category.subCategories && (
							<NavigationMenu.Content className="fixed left-0 top-[5rem] flex w-screen origin-top animate-showNav items-start justify-center gap-6 overflow-hidden overflow-x-hidden border-b-[3px] border-b-red-600 bg-[rgb(20,20,20)]">
								<div className="my-auto h-[250px] w-[300px]">
									<Image
										height={250}
										width={300}
										className={` h-full w-full object-contain  p-5 `}
										src={imageSrc ? imageSrc : nextLogo}
										alt={"category Image"}
									/>
								</div>
								<div className="m-0 flex w-1/3 flex-col gap-2 p-[22px] ">
									<div className="relative">
										<h2 className="w-auto text-zinc-400">{t(category.slug)}</h2>
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
											<li
												key={subCategory.slug}
												onMouseEnter={() => changeImageSrc(subCategory.slug)}
												className=""
											>
												<Link
													href={
														isDirectSlug.includes(subCategory.slug)
															? `/${subCategory.slug}`
															: `/category/${subCategory.slug}`
													}
													title={t(subCategory.slug)}
													className="group"
												>
													<span className="group-hover:border-b-2 group-hover:border-red-600 group-hover:text-red-600">
														{t(subCategory.slug)}
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
