"use client";
import Link from "next/link";
import { Category } from "../../data/categories";
import { useTranslations } from "next-intl";
import HamburgerSubCategory from "./HamburgerSubCategory";

type HamburgerCategoryProps = {
	category: Category;
	openCategoryId: number | null;
	setOpenCategoryId: (id: number | null) => void;
	onClose: () => void;
};

export default function HamburgerCategory({
	category,
	openCategoryId,
	setOpenCategoryId,
	onClose
}: HamburgerCategoryProps) {
	const t = useTranslations("categories");

	if (!category.subCategories)
		return (
			<div className="bg-[rgb(11,11,11)] px-4 py-4 md:px-6 md:py-6">
				<Link
					href={`/category/${category.slug}`}
					onClick={onClose}
					title={t(category.slug)}
					className="font-bold "
				>
					{t(category.slug).toUpperCase()}
				</Link>
			</div>
		);

	return (
		<HamburgerSubCategory
			openCategoryId={openCategoryId}
			category={category}
			setOpenCategoryId={setOpenCategoryId}
			onClick={onClose}
			subCategories={category.subCategories}
		/>
	);
}
