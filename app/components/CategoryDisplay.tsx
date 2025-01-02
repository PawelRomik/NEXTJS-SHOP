import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_RANDOM_PRODUCTS } from "../queries/productPage";
import { Suspense } from "react";
import ProductDisplay from "./ProductDisplay";
import { QueryResult } from "../queries/productType";
import { useTranslations } from "next-intl";
import * as motion from "framer-motion/client";
import Link from "next/link";

type ProductOtherSectionProps = {
	category: string;
	locale: string;
};

const item = {
	visible: { y: 0 },
	hidden: { y: "-200%" }
};

export default function CategoryDisplay({ category, locale }: ProductOtherSectionProps) {
	const t = useTranslations("product");

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
				<motion.section
					variants={item}
					transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
					id="others"
					className="z-10 my-[50px] flex w-full flex-col overflow-y-hidden bg-black  p-3 text-white "
				>
					<div className="relative w-full overflow-hidden lg:static lg:flex-1">
						<div className="flex gap-6 overflow-x-auto py-2 lg:static lg:grid lg:grid-cols-[1fr_1fr_1fr_1fr_0.5fr]">
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
							<Link
								href={`/category/${category}`}
								className="lg:max-w- min-w-[300px] max-w-[400px] lg:min-w-0"
							>
								<button className="text-1xl group flex h-full  w-full flex-col items-center justify-center border-[4px] border-zinc-900 bg-zinc-950 font-bold uppercase transition hover:border-red-600 hover:bg-zinc-900">
									<i className="ri-arrow-right-s-fill text-8xl transition group-hover:scale-110"></i>
									Zobacz więcej
								</button>
							</Link>
						</div>
					</div>
				</motion.section>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getProducts()}</Suspense>;
}
