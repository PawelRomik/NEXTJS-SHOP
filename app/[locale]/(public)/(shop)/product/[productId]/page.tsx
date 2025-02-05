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

export default function ProductPage({
	params: { locale, productId }
}: {
	params: { productId: string; locale: string };
}) {
	revalidatePath("/[locale]/product/[productId]", "page");

	return (
		<main className=" flex w-full flex-col overflow-x-hidden bg-zinc-950">
			<ProductNavigationButtons />
			<ProductShowcaseSection productId={productId} locale={locale} />
			<div className="flex h-[120px] items-center justify-center bg-[rgb(15,15,20)] text-4xl font-bold uppercase text-white">
				<p>Opis</p>
			</div>
			<ProductDescriptionSection productId={productId} locale={locale} />
			<div className="flex h-[120px] items-center justify-center bg-[rgb(15,15,20)] text-4xl font-bold uppercase text-white">
				<p>Techniczne</p>
			</div>
			<ProductTechnicalSection productId={productId} locale={locale} />
			<div className="flex h-[120px] items-center justify-center bg-[rgb(15,15,20)] text-4xl font-bold uppercase text-white">
				<p>Inne Produkty</p>
			</div>
			<ProductOtherSection productId={productId} locale={locale} />
		</main>
	);
}
