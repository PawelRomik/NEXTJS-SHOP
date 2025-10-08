import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import CategorySection from "../../../components/category-section/CategorySection";
import NewProductsSection from "../../../components/NewProductsSection";
import SaleProductsSection from "../../../components/SaleProductsSection";
import BundlesSection from "../../../components/bundles-section/BundlesSection";
import { GET_CATEGORIES } from "../../../queries/category";
import { getApolloClient } from "../../../../apollo-client";
import { CategoryData, QueryResult } from "../../../queries/productType";
import { ApolloQueryResult } from "@apollo/client";

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
			<NewProductsSection />
			<CategorySection num={1} locale={locale} category={cat1} />
			<SaleProductsSection />
			<CategorySection num={2} locale={locale} category={cat2} />
			<BundlesSection />
			<CategorySection num={3} locale={locale} category={cat3} />
		</main>
	);
}
