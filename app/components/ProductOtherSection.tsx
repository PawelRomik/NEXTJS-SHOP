import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_OTHER_PRODUCTS, GET_PRODUCT_CATEGORY } from "../queries/productPage";
import { Suspense } from "react";
import ProductDisplay from "./ProductDisplay";
import { QueryResult } from "../queries/productType";
import { useTranslations } from "next-intl";

type ProductOtherSectionProps = {
	productId: string;
	locale: string;
};

export default function ProductOtherSection({ productId, locale }: ProductOtherSectionProps) {
	const t = useTranslations("product");

	async function getCategory() {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_PRODUCT_CATEGORY,
				variables: {
					productId: productId,
					locale: locale
				}
			});

			return data.products.data[0].attributes.categories.data[0].attributes.slug;
		} catch {
			return null;
		}
	}

	async function getProducts() {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_OTHER_PRODUCTS,
				variables: {
					productId: productId,
					category: await getCategory(),
					locale: locale
				}
			});
			return (
				<section
					id="others"
					className="shadow-inset relative flex w-full flex-col overflow-y-hidden bg-zinc-900  p-3 text-white "
				>
					<div className="relative w-full overflow-hidden lg:static lg:flex-1">
						<div className="flex gap-6 overflow-x-auto py-2 lg:static">
							{data.products.data.map((product) => (
								<ProductDisplay
									uuid={product.attributes.uuid}
									name={product.attributes.name}
									desc={product.attributes.desc}
									price={product.attributes.price}
									salePrice={product.attributes.salePrice}
									category={product.attributes.categories.data[0].attributes.name}
									imageUrl={product.attributes.images.data[0].attributes.url}
									key={product.id}
								></ProductDisplay>
							))}
						</div>
					</div>
				</section>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getProducts()}</Suspense>;
}
