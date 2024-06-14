import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../apollo-client";
import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../../components/ProductDisplay";
import { QueryResult } from "../../../queries/productType";
import { GET_SEARCH_PRODUCTS } from "../../../queries/search";

import { Metadata } from "next";
import SearchPagination from "../../../components/SearchPagination";

export const metadata: Metadata = {
	title: "N3XT | Search results"
};

export default async function SearchPage({
	searchParams
}: {
	searchParams?: {
		query?: string;
		page?: number;
	};
}) {
	const query = searchParams?.query || "";
	const currPage = searchParams?.page || 1;
	const client = createApolloClient();

	const { data }: ApolloQueryResult<QueryResult> = await client.query({
		query: GET_SEARCH_PRODUCTS,
		variables: {
			name: query,
			page: Number(currPage)
		}
	});

	return (
		<main className="flex-1 p-6	">
			<h1 className="flex items-center pl-6 text-4xl font-bold">
				<span className="mr-2 rounded-full border-2 border-black px-3 text-2xl">
					{data.products.data.length}
				</span>
				<span>Matches for &quot;{query}&quot;</span>
			</h1>

			<Grid gap="4" width="auto" className="grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-4">
				{data.products.data.map((product) => (
					<ProductDisplay
						id={product.id}
						name={product.attributes.name}
						salePrice={product.attributes.salePrice}
						onSale={product.attributes.onSale}
						price={product.attributes.price}
						category={product.attributes.categories.data[1].attributes.name}
						imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.image.data.attributes.url}`}
						key={product.id}
					></ProductDisplay>
				))}
			</Grid>
			<SearchPagination
				currentPage={Number(currPage)}
				pagesCount={Number(data.products.meta.pagination.pageCount)}
			/>
		</main>
	);
}
