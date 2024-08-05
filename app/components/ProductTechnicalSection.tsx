import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_PRODUCT_TECHNICAL } from "../queries/productPage";
import { Suspense } from "react";
import { QueryResultSingle } from "../queries/productType";

type ProductTechnicalSectionProps = {
	productId: string;
};

export default function ProductTechnicalSection({ productId }: ProductTechnicalSectionProps) {
	async function getTechnical() {
		try {
			const client = createApolloClient();
			const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
				query: GET_PRODUCT_TECHNICAL,
				variables: {
					productId: productId
				}
			});
			if (!data) return null;

			const lines = data.product.data.attributes.technical.trim().split("\n");

			const tableRows = lines.map((line, index) => {
				const parts = line.split(" | ");

				return (
					<tr key={index} className="w-full">
						<td className=" w-[30%] border-2 border-red-600  p-2">{parts[0]}:</td>
						<td className=" w-[70%] border-2 border-red-600  p-2">{parts[1]}</td>
					</tr>
				);
			});

			return (
				<section
					id="technical"
					className="relative flex w-full flex-col bg-black   p-3 pt-24 text-white "
				>
					<h2 className="absolute left-5 top-5 border-b-2 border-r-2 border-red-600 p-3 px-10 text-2xl font-bold text-red-600">
						Techniczne
					</h2>
					<table className=" w-full">
						<tbody className="w-full">{tableRows}</tbody>
					</table>
				</section>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getTechnical()}</Suspense>;
}
