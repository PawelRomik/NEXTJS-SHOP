import { revalidatePath } from "next/cache";
import { Metadata } from "next";

import CategorySection from "../../../components/CategorySection";

export const metadata: Metadata = {
	title: "Ephonix"
};

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
	revalidatePath("/[locale]/", "page");

	return (
		<main className=" w-full bg-black">
			<CategorySection locale={locale} category="processor"></CategorySection>
			<CategorySection locale={locale} category="processor"></CategorySection>
			<CategorySection locale={locale} category="processor"></CategorySection>
		</main>
	);
}
