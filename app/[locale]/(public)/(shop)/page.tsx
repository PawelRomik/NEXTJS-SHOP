import { revalidatePath } from "next/cache";
import { Metadata } from "next";

import CategorySection from "../../../components/CategorySection";
import NewProductsSection from "../../../components/NewProductsSection";

export const metadata: Metadata = {
	title: "Ephonix"
};

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
	revalidatePath("/[locale]/", "page");

	return (
		<main className=" w-full bg-black">
			{Array.from({ length: 3 }, (_, num) => (
				<>
					<NewProductsSection type={num + 1} />
					<CategorySection num={num + 1} locale={locale} category="processor" />
				</>
			))}
		</main>
	);
}
