import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_OTHER_PRODUCTS, GET_PRODUCT_CATEGORY } from "../queries/productPage";
import { Suspense } from "react";
import ProductDisplay from "./ProductDisplay";
import { QueryResult, QueryResultSingle } from "../queries/productType";
import { useTranslations } from "next-intl";

type ProductOtherSectionProps = {
	productId: string;
};

export default async function ProductOtherSection({ productId }: ProductOtherSectionProps) {
	const t = useTranslations("product");
	async function getCategory() {
		try {
			const client = createApolloClient();
			const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
				query: GET_PRODUCT_CATEGORY,
				variables: {
					productId: productId
				}
			});

			return data.product.data.attributes.categories.data[0].attributes.slug;
		} catch {
			return null;
		}
	}

	async function getProducts() {
		try {
			const client = createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_OTHER_PRODUCTS,
				variables: {
					productId: productId,
					category: await getCategory()
				}
			});
			return (
				<section
					id="others"
					className="relative flex w-full flex-col bg-black  p-3  pt-24 text-white "
				>
					<h2 className="absolute left-5 top-5 border-b-2 border-r-2 border-red-600 p-3 px-10 text-2xl font-bold text-red-600">
						{t("otherSection")}
					</h2>
					<div className="relative w-full overflow-hidden lg:static lg:flex-1">
						<div className="flex gap-6 overflow-x-auto py-2 lg:static">
							{data.products.data.map((product) => (
								<ProductDisplay
									id={product.id}
									name={product.attributes.name}
									desc={product.attributes.desc}
									price={product.attributes.price}
									salePrice={product.attributes.salePrice}
									category={product.attributes.categories.data[0].attributes.name}
									imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.images.data[0].attributes.url}`}
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
