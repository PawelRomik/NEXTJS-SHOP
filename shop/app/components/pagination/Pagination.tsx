"use client";
import { useMemo } from "react";
import PaginationArrow from "./PaginationArrow";
import PaginationButton from "./PaginationButton";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
	pagesCount: number;
	currentPage: number;
};

export default function Pagination({ pagesCount, currentPage }: PaginationProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());

	const createPageLink = (page: number): string => {
		params.set("page", page.toString());
		return `${pathname}?${params.toString()}`;
	};

	const paginationRange = useMemo(() => {
		if (pagesCount <= 5) return Array.from({ length: pagesCount }, (_, i) => i + 1);

		const middleIndex = 3;
		let startPage = Math.max(currentPage - middleIndex + 1, 1);
		let endPage = Math.min(startPage + 4, pagesCount);

		if (endPage - startPage < 4) startPage = Math.max(endPage - 4, 1);

		return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}, [pagesCount, currentPage]);

	if (pagesCount <= 1) return null;

	return (
		<nav
			aria-label="Pagination"
			className="shadow-bottom flex w-full items-center justify-center gap-1 pb-3 lg:gap-2"
		>
			<PaginationArrow
				direction="prev"
				disabled={currentPage - 1 <= 0}
				href={createPageLink(currentPage - 1 > 0 ? currentPage - 1 : 1)}
				icon="arrow-left-s-fill"
			/>

			{paginationRange.map((page) => (
				<PaginationButton
					key={page}
					page={page}
					currentPage={currentPage}
					href={createPageLink(page)}
				/>
			))}

			<PaginationArrow
				direction="next"
				disabled={currentPage + 1 > pagesCount}
				href={createPageLink(currentPage + 1 <= pagesCount ? currentPage + 1 : pagesCount)}
				icon="arrow-right-s-fill"
			/>
		</nav>
	);
}
