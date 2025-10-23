"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

type ProductButtonProps = {
	uuid: string;
};

export const ProductButton = ({ uuid }: ProductButtonProps) => {
	const t = useTranslations();

	return (
		<div className="my-6 flex w-full items-center justify-center px-5">
			<Link
				href={`/product/${uuid}`}
				title={t("productSection.check")}
				className="flex h-full w-full items-center justify-center"
			>
				<button className="flex h-full w-[80%] items-center justify-center rounded-full bg-red-600 p-3 font-bold text-white hover:scale-105 hover:bg-red-500">
					{t("productSection.check")}
				</button>
			</Link>
		</div>
	);
};
