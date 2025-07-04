import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { GET_PRODUCT_NAME } from "../../../../../queries/productPage";
import { Metadata } from "next";
import ProductNavigationButtons from "../../../../../components/ProductNavigationButtons";
import ProductShowcaseSection from "../../../../../components/ProductShowcaseSection";
import ProductDescriptionSection from "../../../../../components/ProductDescriptionSection";
import ProductTechnicalSection from "../../../../../components/ProductTechnicalSection";
import ProductOtherSection from "../../../../../components/ProductOtherSection";
import { QueryResult } from "../../../../../queries/productType";
import ProductSectionTitle from "../../../../../components/ProductSectionTitle";
import { getTranslations } from "next-intl/server";

async function fetchProduct(productId: string, locale: string) {
	try {
		const client = await createApolloClient();

		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_PRODUCT_NAME,
			variables: {
				productId,
				locale
			}
		});

		const currProduct = data.products.data[0];
		return currProduct;
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params: { locale, productId }
}: {
	params: { locale: string; productId: string };
}): Promise<Metadata> {
	const product = await fetchProduct(productId, locale);

	if (product) {
		return {
			title: `${product.attributes.name} | Ephonix`
		};
	}
	return {
		title: `Ephonix`
	};
}

export default async function ProductPage({
	params: { locale, productId }
}: {
	params: { productId: string; locale: string };
}) {
	revalidatePath("/[locale]/product/[productId]", "page");
	const t = await getTranslations("product");

	return (
		<main className=" flex w-full flex-col overflow-x-hidden bg-zinc-950">
			<ProductNavigationButtons />
			<ProductShowcaseSection productId={productId} locale={locale} />
			<ProductSectionTitle title={t("descriptionSection")} />
			<ProductDescriptionSection productId={productId} locale={locale} />
			<ProductSectionTitle title={t("technicalSection")} />
			<ProductTechnicalSection productId={productId} locale={locale} />
			<ProductSectionTitle title={t("otherSection")} />
			<ProductOtherSection productId={productId} locale={locale} />
		</main>
	);
}
