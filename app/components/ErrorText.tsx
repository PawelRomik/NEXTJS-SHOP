"use client";
import { useTranslations } from "next-intl";

export default function ErrorText() {
	const t = useTranslations("common");

	return (
		<p className="col-span-4 row-auto w-full text-center text-3xl font-bold text-zinc-400">
			<i className="ri-error-warning-line"></i> {t("errorLoadingProducts")}
		</p>
	);
}
