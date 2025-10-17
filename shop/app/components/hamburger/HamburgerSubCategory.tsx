"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Category, SubCategory } from "../../data/categories";

type HamburgerSubCategoryProps = {
	subCategories: SubCategory[];
	category: Category;
	onClick: () => void;
	openCategoryId: number | null;
	setOpenCategoryId: (id: number | null) => void;
};

export default function HamburgerSubCategory({
	subCategories,
	category,
	onClick,
	openCategoryId,
	setOpenCategoryId
}: HamburgerSubCategoryProps) {
	const isDirectSlug = ["new", "sale", "bundles"];
	const t = useTranslations("categories");
	return (
		<div className="group w-full bg-[rgb(11,11,11)]">
			<button
				className={`w-full cursor-pointer items-center justify-center bg-[rgb(11,11,11)] px-4 py-4 transition md:px-6 md:py-6 ${
					openCategoryId === category.id ? "bg-red-600" : ""
				}`}
				onClick={() => setOpenCategoryId(openCategoryId === category.id ? null : category.id)}
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
					{subCategories.map((subCategory) => {
						const slug = subCategory.slug;
						const href = isDirectSlug.includes(slug) ? `/${slug}` : `/category/${slug}`;
						return (
							<div
								key={slug}
								className="bg-[rgb(20,20,20)]  px-6 py-3 transition hover:text-red-600 focus:text-red-600 md:py-6"
							>
								<Link href={href} title={t(slug)} onClick={onClick} className="text-white">
									<i className="ri-arrow-right-s-fill"></i>
									<b>{t(slug)}</b>
								</Link>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
