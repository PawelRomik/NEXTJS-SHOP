import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { QueryResultSingle } from "../../../../../queries/productType";
import { GET_PRODUCT_NAME } from "../../../../../queries/productPage";
import { Metadata } from "next";
import ScrollBuyButton from "../../../../../components/ScrollBuyButton";
import ProductNavigationButtons from "../../../../../components/ProductNavigationButtons";
import ProductShowcaseSection from "../../../../../components/ProductShowcaseSection";
import ProductDescriptionSection from "../../../../../components/ProductDescriptionSection";
import ProductTechnicalSection from "../../../../../components/ProductTechnicalSection";
import ProductOtherSection from "../../../../../components/ProductOtherSection";

async function fetchProduct(productId: string) {
	try {
		const client = createApolloClient();

		const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
			query: GET_PRODUCT_NAME,
			variables: {
				productId
			}
		});

		const currProduct = data.product.data;
		return currProduct;
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params
}: {
	params: { locale: string; productId: string };
}): Promise<Metadata> {
	const productId = params.productId;
	const product = await fetchProduct(productId);

	if (product) {
		return {
			title: `${product.attributes.name} | Ephonix`
		};
	}
	return {
		title: `Ephonix`
	};
}

export default function ProductPage({ params: { productId } }: { params: { productId: string } }) {
	revalidatePath("/[locale]/product/[productId]", "page");

	return (
		<main className=" flex w-full flex-col gap-3 bg-zinc-950">
			<ScrollBuyButton productId={productId} />
			<ProductNavigationButtons />
			<ProductShowcaseSection productId={productId} />
			<ProductDescriptionSection productId={productId} />
			<ProductTechnicalSection productId={productId} />
			<ProductOtherSection productId={productId} />
		</main>
	);
}
