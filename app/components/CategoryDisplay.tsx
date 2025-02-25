import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_RANDOM_PRODUCTS } from "../queries/productPage";
import { Suspense } from "react";
import ProductDisplay from "./ProductDisplay";
import { QueryResult } from "../queries/productType";
import { useTranslations } from "next-intl";
import Link from "next/link";

type ProductOtherSectionProps = {
	category: string;
	locale: string;
};

export default function CategoryDisplay({ category, locale }: ProductOtherSectionProps) {
	const t = useTranslations("productSection");

	async function getProducts() {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_RANDOM_PRODUCTS,
				variables: {
					startIndex: 0,
					category: category,
					locale: locale
				}
			});
			return (
				<section
					id="others"
					className="shadow-inset z-10 flex w-full flex-col items-center justify-center overflow-y-hidden bg-[rgb(20,20,20)]  p-3  py-8  text-white  "
				>
					<div className="flex w-full flex-col items-center gap-5 overflow-hidden lg:static lg:flex-1">
						<div className="flex w-full gap-6 overflow-x-auto px-8 py-2 lg:static lg:grid lg:grid-cols-[1fr_1fr_1fr_1fr]">
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
						<Link href={`/category/${category}`}>
							<button className="group flex h-full w-full flex-col items-center justify-center rounded-lg  bg-red-600  px-10 py-4  text-xl  font-bold uppercase transition  hover:bg-red-500">
								{t("checkLong")}
							</button>
						</Link>
					</div>
				</section>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getProducts()}</Suspense>;
}
