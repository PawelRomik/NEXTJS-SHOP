import { getApolloClient } from "../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_RANDOM_PRODUCTS } from "../../queries/productPage";
import { QueryResult } from "../../queries/productType";
import ProductDisplay from "../common/ProductDisplay";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type ProductOtherSectionProps = {
	category: string;
	locale: string;
};

export interface ProductAttributes {
	uuid: string;
	name: string;
	desc: string;
	price: number;
	salePrice: number;
	categories: { data: { attributes: { name: string } }[] };
	images: { data: { attributes: { url: string } }[] };
}

export interface ProductData {
	id: string;
	attributes: ProductAttributes;
}

export default async function CategoryDisplay({ category, locale }: ProductOtherSectionProps) {
	const t = await getTranslations("productSection");
	const client = await getApolloClient();
	let productsData: ProductData[] = [];
	try {
		const { data }: ApolloQueryResult<QueryResult> = await client.query({
			query: GET_RANDOM_PRODUCTS,
			variables: {
				startIndex: 0,
				category: category,
				locale: locale
			}
		});
		productsData = data?.products?.data ?? [];
	} catch {
		productsData = [];
	}

	if (!productsData.length) return null;

	return (
		<section
			id="others"
			className="shadow-inset z-10 flex w-full flex-col items-center justify-center overflow-y-hidden bg-[rgb(20,20,20)]  p-3  py-8  text-white  "
		>
			<div className="flex w-full flex-col items-center gap-5 overflow-hidden lg:static lg:flex-1">
				<div className="flex w-full gap-6 overflow-x-auto py-2 lg:static lg:grid lg:grid-cols-[1fr_1fr_1fr_1fr] lg:px-8">
					{productsData.map((product) => (
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
}
