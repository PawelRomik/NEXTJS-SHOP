"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

type CardBannerProps = {
	title: string;
	desc: string;
};

export default function CardBanner({ title, desc }: CardBannerProps) {
	const t = useTranslations("productSection");
	return (
		<div
			className={`flex h-full flex-col items-center justify-center gap-3 text-center text-2xl text-white lg:mx-[10%] `}
		>
			<h2 className="text-shadow-lg -skew-x-12 text-4xl font-bold text-red-600 lg:text-7xl">
				{title}
			</h2>
			<h4 className="text-shadow-lg w-[300px] py-3 text-center text-lg text-zinc-200 lg:w-[800px] lg:text-left lg:text-2xl">
				{desc}
			</h4>
			<Link href="/new" className="lg:w-[800px]">
				<button className="w-[200px] rounded-lg bg-red-600 p-3 font-bold text-white hover:bg-red-500 lg:w-full">
					{t("check")}
				</button>
			</Link>
		</div>
	);
}
