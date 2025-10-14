"use client";
import Link from "next/link";

type PaginationButtonProps = {
	page: number;
	currentPage: number;
	href: string;
};

export default function PaginationButton({ page, currentPage, href }: PaginationButtonProps) {
	return (
		<Link
			key={page}
			href={href}
			scroll={false}
			className={`${page !== currentPage ? "hidden lg:flex" : "flex"}`}
		>
			<button
				className={`flex h-[3rem] w-[3rem] items-center justify-center rounded-sm border-2 bg-[rgb(11,11,11)] text-white transition  hover:scale-105   disabled:opacity-30 ${
					currentPage === page
						? " border-red-600 bg-red-600 font-bold "
						: "border-[rgb(11,11,11)]  "
				} `}
			>
				{page}
			</button>
		</Link>
	);
}
