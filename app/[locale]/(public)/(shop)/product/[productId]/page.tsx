import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { QueryResultSingle } from "../../../../../queries/productType";
import { GET_PRODUCT_NAME } from "../../../../../queries/productPage";
import { Metadata } from "next";
import ProductNavigationButtons from "../../../../../components/ProductNavigationButtons";
import ProductShowcaseSection from "../../../../../components/ProductShowcaseSection";
import ProductDescriptionSection from "../../../../../components/ProductDescriptionSection";
import ProductTechnicalSection from "../../../../../components/ProductTechnicalSection";
import ProductOtherSection from "../../../../../components/ProductOtherSection";

async function fetchProduct(productId: string, locale: string) {
	try {
		const client = createApolloClient();

		const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
			query: GET_PRODUCT_NAME,
			variables: {
				productId,
				locale
			}
		});

		const currProduct = data.product.data;
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

export default function ProductPage({
	params: { locale, productId }
}: {
	params: { productId: string; locale: string };
}) {
	revalidatePath("/[locale]/product/[productId]", "page");

	return (
		<main className=" flex w-full flex-col gap-3 bg-zinc-950">
			<ProductNavigationButtons />
			<ProductShowcaseSection productId={productId} locale={locale} />
			<ProductDescriptionSection productId={productId} locale={locale} />
			<ProductTechnicalSection productId={productId} locale={locale} />
			<ProductOtherSection productId={productId} locale={locale} />
		</main>
	);
}
