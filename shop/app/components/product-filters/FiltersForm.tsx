"use client";
import { useTranslations } from "next-intl";
import FiltersList from "./FiltersList";
import FiltersSubmit from "./FiltersSubmit";

type FiltersFormProps = {
	filters: {
		id: string;
		attributes: {
			name: string;
			tags: {
				data: {
					attributes: { name: string };
				}[];
			};
		};
	}[];
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FiltersForm({ filters, onSubmit }: FiltersFormProps) {
	const t = useTranslations("filters");

	return (
		<form onSubmit={onSubmit} className="flex w-full flex-col items-start justify-start gap-2">
			<FiltersList filters={filters} />
			<FiltersSubmit label={t("apply")} />
		</form>
	);
}
