import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import { QueryResultSingle } from "../../../../queries/productType";
import { GET_PRODUCT_NAME } from "../../../../queries/productPage";
import { Metadata } from "next";
import ScrollBuyButton from "../../../../components/ScrollBuyButton";
import ProductNavigationButtons from "../../../../components/ProductNavigationButtons";
import ProductShowcaseSection from "../../../../components/ProductShowcaseSection";
import ProductDescriptionSection from "../../../../components/ProductDescriptionSection";
import ProductTechnicalSection from "../../../../components/ProductTechnicalSection";
import ProductOtherSection from "../../../../components/ProductOtherSection";

async function fetchProduct(productId: string) {
	const client = createApolloClient();

	const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
		query: GET_PRODUCT_NAME,
		variables: {
			productId
		}
	});

	const currProduct = data.product.data;
	return currProduct;
}

export async function generateMetadata({
	params
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const productId = params.productId;
	const product = await fetchProduct(productId);

	return {
		title: `${product.attributes.name} | Ephonix`
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	revalidatePath("/product/[productId]", "page");
	const productId = params.productId;

	return (
		<main className=" flex w-full flex-col gap-3 bg-zinc-950">
			<ProductNavigationButtons />
			<ProductShowcaseSection productId={productId} />
			<ProductDescriptionSection productId={productId} />
			<ProductTechnicalSection productId={productId} />
			<ProductOtherSection productId={productId} />
		</main>
	);
}
