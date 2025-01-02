"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import createApolloClient from "../../apollo-client";
import { CategoryData } from "../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import { GET_CATEGORIES, GET_CATEGORY_IMAGE } from "../queries/category";
import nextLogo from "../../public/logo.png";
import { useTranslations } from "next-intl";

export default function NavigationLinks() {
	const t = useTranslations("categories");
	const [imageSrc, setImageSrc] = useState<string>("");
	const [groupedCategories, setGroupedCategories] = useState<{
		[key in keyof IntlMessages["categories"]]?: CategoryData["categories"]["data"];
	}>({});

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

	useEffect(() => {
		async function fetchProducts() {
			try {
				const client = await createApolloClient();
				const { data }: ApolloQueryResult<CategoryData> = await client.query({
					query: GET_CATEGORIES
				});
				const categories = data.categories.data;
				const grouped = categories.reduce<{
					[key: string]: CategoryData["categories"]["data"];
				}>((acc, category) => {
					const groupName: keyof IntlMessages["categories"] =
						category.attributes.category_group.data.attributes.name;

					if (!acc[groupName]) {
						acc[groupName] = [];
					}

					acc[groupName].push(category);
					return acc;
				}, {});

				setGroupedCategories(grouped);
			} catch (err) {
				console.error(err);
			}
		}

		fetchProducts();
	}, []);

	return (
		<NavigationMenu.Root
			onValueChange={() => setImageSrc("")}
			className="relative z-[1] hidden w-svw flex-1 justify-center lg:flex"
		>
			<NavigationMenu.List className="flex items-center justify-center gap-6 overflow-hidden">
				{Object.entries(groupedCategories).map(([groupName, categories]) => (
					<NavigationMenu.Item key={groupName}>
						<NavigationMenu.Trigger className="font-bold uppercase text-white hover:text-red-600 data-[state=open]:text-red-600">
							<span>{t(groupName as keyof IntlMessages["categories"])}</span>
							<i className="ri-arrow-drop-down-line"></i>
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className="fixed left-0 top-[5rem] flex w-screen origin-top animate-showNav items-start justify-center gap-6 overflow-hidden overflow-x-hidden border-b-[3px] border-b-red-600 bg-zinc-900 ">
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
									<h2 className="w-auto text-zinc-400">
										{t(groupName as keyof IntlMessages["categories"])}
									</h2>
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
									{categories?.map((category) => (
										<li
											key={category.id}
											onMouseEnter={() => changeImageSrc(category.attributes.slug)}
										>
											<Link
												href={`/category/${category.attributes.slug}`}
												title={t(category.attributes.slug)}
												className="group"
											>
												<span className="group-hover:border-b-2 group-hover:border-red-600 group-hover:text-red-600">
													{t(category.attributes.slug as keyof IntlMessages["categories"])}
												</span>
												<i className="ri-arrow-drop-right-line group-hover:text-red-600"></i>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
				))}
				<NavigationMenu.Item>
					<Link
						className="font-bold text-white hover:text-red-600 data-[state=open]:text-red-600"
						href={"/support"}
						title={t("support")}
					>
						<span>{t("support").toUpperCase()}</span>
					</Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
