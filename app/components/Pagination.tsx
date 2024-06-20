"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PaginationProps = {
	pagesCount: number;
	currentPage: number;
};

export default function Pagination({ pagesCount, currentPage }: PaginationProps) {
	const pageUrl = usePathname();
	if (pagesCount <= 1) {
		return null;
	}

	const getPaginationRange = () => {
		const middleIndex = Math.ceil(5 / 2);

		let startPage = currentPage - middleIndex + 1;
		let endPage = currentPage + middleIndex - 1;

		if (startPage < 1) {
			endPage += Math.abs(startPage - 1);
			startPage = 1;
		}
		if (endPage > pagesCount) {
			startPage -= endPage - pagesCount;
			endPage = pagesCount;
		}
		startPage = Math.max(startPage, 1);

		return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	};

	const paginationRange = getPaginationRange();

	const hrefPage = pageUrl.split("/").slice(0, -1).join("/");

	return (
		<div className="mb-4 flex w-full items-center justify-center gap-1 self-end lg:gap-3">
			<Link key={"pageBefore"} href={`${hrefPage}/${currentPage - 1 > 0 ? currentPage - 1 : 1}`}>
				<button
					disabled={currentPage - 1 <= 0}
					className={`flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center border-2
							bg-white text-black disabled:cursor-default disabled:opacity-30
					`}
				>
					<i className="ri-arrow-left-s-fill text-2xl"></i>
				</button>
			</Link>

			{paginationRange.map((page) => (
				<Link key={page} href={`${hrefPage}/${page}`}>
					<button
						className={`flex h-[3rem] w-[3rem] items-center justify-center disabled:opacity-30 ${
							currentPage === page
								? "border-2 bg-white text-black lg:border-none lg:bg-zinc-900 lg:text-white"
								: "border-2 bg-white text-black"
						} ${page != currentPage ? "hidden lg:flex" : "flex"}`}
					>
						{page}
					</button>
				</Link>
			))}

			<Link
				key={"pageAfter"}
				href={`${hrefPage}/${currentPage + 1 <= pagesCount ? currentPage + 1 : pagesCount}`}
			>
				<button
					disabled={currentPage + 1 > pagesCount}
					className={`flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center
							border-2 bg-white text-black disabled:cursor-default disabled:opacity-50
					`}
				>
					<i className="ri-arrow-right-s-fill text-2xl"></i>
				</button>
			</Link>
		</div>
	);
}
