"use client";
import Link from "next/link";

type PaginationArrowProps = {
	direction: string;
	disabled: boolean;
	href: string;
	icon: string;
};

export default function PaginationArrow({ direction, disabled, href, icon }: PaginationArrowProps) {
	return (
		<Link key={direction} href={href} scroll={false}>
			<button
				disabled={disabled}
				className={`flex h-[3rem] w-[3rem] items-center justify-center rounded-sm  bg-[rgb(11,11,11)] text-white transition  hover:scale-105   disabled:opacity-30
				`}
			>
				<i className={`ri-${icon} text-2xl`} />
			</button>
		</Link>
	);
}
