"use client";
import { useTranslations } from "next-intl";
import nextLogo from "../../public/logo.png";
import Image from "next/image";

export default function ErrorText() {
	const t = useTranslations("common");

	return (
		<div className="flex w-full items-center justify-center py-20">
			<p className="flex h-full w-full flex-col items-center justify-center gap-8 text-center text-3xl font-bold text-white ">
				<Image
					src={nextLogo}
					width={220}
					height={300}
					className="hidden w-[220px] lg:block"
					alt={t("shopLogo")}
				/>
				<h2 className="-rotate-3 text-4xl text-red-600">ERROR 500!</h2>
				<p className="rotate-3">{t("errorLoadingProducts")}</p>
				<button
					onClick={() => window.location.reload()}
					className=" -rotate-3 rounded-lg bg-red-600 px-6 py-3 transition hover:bg-red-500"
				>
					{t("retry")}
				</button>
			</p>
		</div>
	);
}
