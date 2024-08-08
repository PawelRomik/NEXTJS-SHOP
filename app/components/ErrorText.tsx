"use client";
import { useTranslation } from "next-i18next";

export default function ErrorText() {
	const { t } = useTranslation();

	return (
		<p className="col-span-4 row-auto w-full text-center text-3xl font-bold text-zinc-400">
			<i className="ri-error-warning-line"></i> {t("common:errorT")}
		</p>
	);
}
