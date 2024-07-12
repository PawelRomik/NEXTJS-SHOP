"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
	pagesCount: number;
	currentPage: number;
};

export default function Pagination({ pagesCount, currentPage }: PaginationProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());

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

	const createPageLink = (page: number) => {
		params.set("page", page.toString());
		return `${pathname}?${params.toString()}`;
	};

	return (
		<div className=" flex w-full items-center justify-center gap-1 lg:gap-2">
			<Link key={"pageBefore"} href={createPageLink(currentPage - 1 > 0 ? currentPage - 1 : 1)}>
				<button
					disabled={currentPage - 1 <= 0}
					className={`flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center border-2
						border-zinc-800 bg-black text-white hover:enabled:scale-105 disabled:cursor-default disabled:opacity-40
				`}
				>
					<i className="ri-arrow-left-s-fill text-2xl"></i>
				</button>
			</Link>

			{paginationRange.map((page) => (
				<Link
					key={page}
					href={createPageLink(page)}
					className={`${page != currentPage ? "hidden lg:flex" : "flex"}`}
				>
					<button
						className={`flex h-[3rem] w-[3rem] items-center justify-center border-2 bg-black text-white hover:scale-105 disabled:opacity-30 ${
							currentPage === page ? " border-red-600 " : "border-zinc-800"
						} `}
					>
						{page}
					</button>
				</Link>
			))}

			<Link
				key={"pageAfter"}
				href={createPageLink(currentPage + 1 <= pagesCount ? currentPage + 1 : pagesCount)}
			>
				<button
					disabled={currentPage + 1 > pagesCount}
					className={`flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center border-2
						border-zinc-800 bg-black text-white hover:enabled:scale-105 disabled:cursor-default disabled:opacity-50
				`}
				>
					<i className="ri-arrow-right-s-fill text-2xl"></i>
				</button>
			</Link>
		</div>
	);
}
