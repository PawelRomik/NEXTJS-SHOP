"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useProductFilters() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const params = new URLSearchParams(searchParams.toString());
		const selectedTags = formData.getAll("tags").filter(Boolean);
		const sort = formData.get("sort");

		params.set("page", "1");

		if (selectedTags.length === 0) params.delete("tags");
		else params.set("tags", selectedTags.join(","));

		if (sort) params.set("sort", sort.toString());
		else params.delete("sort");

		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return { handleSubmit };
}
