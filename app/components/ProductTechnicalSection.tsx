import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_PRODUCT_TECHNICAL } from "../queries/productPage";
import { Suspense } from "react";
import { QueryResult } from "../queries/productType";
import { useTranslations } from "next-intl";
import * as motion from "framer-motion/client";

type ProductTechnicalSectionProps = {
	productId: string;
	locale: string;
};

const list = {
	visible: {},
	hidden: {}
};

const item = {
	visible: { x: 0 },
	hidden: { x: "-200%" }
};

export default function ProductTechnicalSection({
	productId,
	locale
}: ProductTechnicalSectionProps) {
	const t = useTranslations("product");

	async function getTechnical() {
		try {
			const client = createApolloClient();
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
					<tr key={index} className="w-full">
						<td className=" w-[30%] border-2 border-red-600  p-2">{parts[0]}:</td>
						<td className=" w-[70%] border-2 border-red-600  p-2">{parts[1]}</td>
					</tr>
				);
			});

			return (
				<motion.section
					initial="hidden"
					whileInView="visible"
					variants={list}
					viewport={{ once: true }}
					id="technical"
					className="relative flex w-full flex-col bg-black   p-3 pt-24 text-white "
				>
					<h2 className="absolute left-5 top-5 border-b-2 border-r-2 border-red-600 p-3 px-10 text-2xl font-bold text-red-600">
						{t("technicalSection")}
					</h2>
					<motion.table
						variants={item}
						transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}
						className=" w-full"
					>
						<tbody className="w-full">{tableRows}</tbody>
					</motion.table>
				</motion.section>
			);
		} catch {
			return null;
		}
	}

	return <Suspense>{getTechnical()}</Suspense>;
}
