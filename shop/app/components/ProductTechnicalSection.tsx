import { getApolloClient } from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_PRODUCT_TECHNICAL } from "../queries/productPage";
import { Suspense } from "react";
import { QueryResult } from "../queries/productType";
import { useTranslations } from "next-intl";

type ProductTechnicalSectionProps = {
	productId: string;
	locale: string;
};

export default function ProductTechnicalSection({
	productId,
	locale
}: ProductTechnicalSectionProps) {
	const t = useTranslations("product");

	async function getTechnical() {
		try {
			const client = await getApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_PRODUCT_TECHNICAL,
				variables: {
					productId: productId,
					locale: locale
				}
			});
			if (!data) return null;

			const lines = data.products.data[0].attributes.technical.trim().split("\n");

			const tableRows = lines.map((line, index) => {
				const parts = line.split(" | ");

				return (
					<tr key={index} className="w-full bg-[rgb(32,32,32)]">
						<td className=" w-[30%] border-4 border-zinc-950  p-2">{parts[0]}:</td>
						<td className=" w-[70%] border-4 border-zinc-950  p-2">{parts[1]}</td>
					</tr>
				);
			});

			return (
				<section
					id="technical"
					className="shadow-inset relative flex w-full flex-col bg-[rgb(20,20,20)]   p-3 text-white "
				>
					<table className=" w-full">
						<tbody className="w-full  border-4  ">{tableRows}</tbody>
					</table>
				</section>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getTechnical()}</Suspense>;
}
