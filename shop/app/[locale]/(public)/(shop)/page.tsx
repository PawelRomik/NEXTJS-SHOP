import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import CategorySection from "../../../components/category-section/CategorySection";
import NewProductsSection from "../../../components/main-cards/NewProductsSection";
import SaleProductsSection from "../../../components/main-cards/SaleProductsSection";
import BundlesSection from "../../../components/main-cards/BundlesSection";
import { GET_CATEGORIES } from "../../../queries/category";
import { getApolloClient } from "../../../../apollo-client";
import { CategoryData } from "../../../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Ephonix"
};

export default async function MainPage({ params: { locale } }: { params: { locale: string } }) {
	revalidatePath("/[locale]/", "page");
	const client = await getApolloClient();

	async function getCategories() {
		try {
			const { data }: ApolloQueryResult<CategoryData> = await client.query({
				query: GET_CATEGORIES,
				variables: {
					locale: locale
				}
			});

			const filteredCategories = data.categories.data.filter(
				(category) => !["sale", "bundles", "new"].includes(category.attributes.slug)
			);

			return filteredCategories;
		} catch {
			return null;
		}
	}

	const categories = await getCategories();

	function getRandomCategories() {
		if (!categories) return [];
		const shuffled = [...categories].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 3).map((cat) => cat.attributes.slug);
	}

	const [cat1, cat2, cat3] = getRandomCategories();

	return (
		<main className="w-full bg-black">
			<Suspense>
				<NewProductsSection />
			</Suspense>
			<Suspense>
				<CategorySection num={1} locale={locale} category={cat1} />
			</Suspense>

			<Suspense>
				<SaleProductsSection />
			</Suspense>

			<Suspense>
				<CategorySection num={2} locale={locale} category={cat2} />
			</Suspense>

			<Suspense>
				<BundlesSection />
			</Suspense>

			<Suspense>
				<CategorySection num={3} locale={locale} category={cat3} />
			</Suspense>
		</main>
	);
}
