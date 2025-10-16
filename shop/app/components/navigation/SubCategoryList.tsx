"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SubCategory } from "../../data/categories";

type SubCategoryListProps = {
	items: SubCategory[];
	onHover: (slug: string) => void;
};

export function SubCategoryList({ items, onHover }: SubCategoryListProps) {
	const t = useTranslations("categories");
	const isDirectSlug = ["new", "sale", "bundles"];

	return (
		<ul className="text-md relative flex w-full flex-col items-start justify-start gap-2">
			{items.map((subCategory) => (
				<li key={subCategory.slug} onMouseEnter={() => onHover(subCategory.slug)} className="">
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
	);
}
