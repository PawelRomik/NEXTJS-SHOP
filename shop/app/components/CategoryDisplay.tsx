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
		await new Promise((resolve) => setTimeout(resolve, 10000));
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
			if (data.products.data.length < 1) return;
			return (
				<section
					id="others"
					className="shadow-inset z-10 flex w-full flex-col items-center justify-center overflow-y-hidden bg-[rgb(20,20,20)]  p-3  py-8  text-white  "
				>
					<div className="flex w-full flex-col items-center gap-5 overflow-hidden lg:static lg:flex-1">
						<div className="flex w-full gap-6 overflow-x-auto py-2 lg:static lg:grid lg:grid-cols-[1fr_1fr_1fr_1fr] lg:px-8">
							{data.products.data.map((product) => (
								<div className="w-full shrink-0 md:w-auto md:flex-1" key={product.id}>
									<ProductDisplay
										uuid={product.attributes.uuid}
										name={product.attributes.name}
										desc={product.attributes.desc}
										price={product.attributes.price}
										salePrice={product.attributes.salePrice}
										category={product.attributes.categories.data[0].attributes.name}
										imageUrl={product.attributes.images.data[0].attributes.url}
									/>
								</div>
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
