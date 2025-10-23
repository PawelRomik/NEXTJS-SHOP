"use client";

import { useTranslations } from "next-intl";
import { useProductFilters } from "../../lib/hooks/useProductFilters";
import FiltersTitle from "./FiltersTitle";
import FiltersForm from "./FiltersForm";

type ProductFiltersProps = {
	filters: {
		id: string;
		attributes: {
			name: string;
			tags: {
				data: {
					attributes: {
						name: string;
					};
				}[];
			};
		};
	}[];
};

export default function ProductFilters({ filters }: ProductFiltersProps) {
	const t = useTranslations("filters");
	const { handleSubmit } = useProductFilters();

	return (
		<div className="relative z-[20] min-h-[200px] w-full overflow-hidden bg-[rgb(11,11,11)] bg-[size:60%_100%] bg-center">
			<FiltersTitle title={t("filters")} />
			<FiltersForm filters={filters} onSubmit={handleSubmit} />
		</div>
	);
}
