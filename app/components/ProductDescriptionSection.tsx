import Image from "next/image";
import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_PRODUCT_DESC } from "../queries/productPage";
import { Suspense } from "react";
import { QueryResultSingle } from "../queries/productType";

type ProductDescriptionSectionProps = {
	productId: string;
};

export default function ProductDescriptionSection({ productId }: ProductDescriptionSectionProps) {
	async function getProductDesc() {
		try {
			const client = createApolloClient();
			const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
				query: GET_PRODUCT_DESC,
				variables: {
					productId: productId
				}
			});

			const currProduct = data.product.data.attributes;
			const sections = currProduct.desc
				.replace("--START--", "--SECTION--")
				.replace("--END--", "--SECTION--")
				.split("--SECTION--")
				.map((section) => section.trim());

			const renderSections = () => {
				return sections.map((section, index) => {
					let imageFirst = false;

					if (section.trim() === "") {
						return null;
					}
					const parts = section.split("\n");
					if (parts[0].startsWith("![")) {
						imageFirst = true;
					}
					const description = parts
						.filter((part) => !part.startsWith("!["))
						.map((part) => {
							if (part.startsWith("-")) {
								return `<li>${part.substring(1).trim()}</li>`;
							} else if (part.startsWith("**") && part.endsWith("**")) {
								return `<h2 class="font-bold">${part.substring(2, part.length - 2)}</h2>`;
							} else {
								return part;
							}
						})
						.join("\n");

					let imageUrl = "";
					parts.forEach((part) => {
						if (part.startsWith("![")) {
							imageUrl = part.substring(part.indexOf("(") + 1, part.indexOf(")"));
						}
					});

					return (
						<div
							key={index}
							className="flex flex-col items-center justify-between gap-20 px-6 py-4  text-xl lg:flex-row lg:px-32"
						>
							{imageFirst ? (
								<>
									{imageUrl && (
										<Image
											width={600}
											height={600}
											src={imageUrl}
											alt="Processor"
											className="h-full max-h-[300px] object-contain p-6"
										/>
									)}

									<div className="description" dangerouslySetInnerHTML={{ __html: description }} />
								</>
							) : (
								<>
									<div className="description" dangerouslySetInnerHTML={{ __html: description }} />
									{imageUrl && (
										<Image
											width={600}
											height={600}
											src={imageUrl}
											alt="Processor"
											className="h-full max-h-[300px] object-contain p-6"
										/>
									)}
								</>
							)}
						</div>
					);
				});
			};

			return renderSections();
		} catch {
			return null;
		}
	}

	return (
		<section id="description" className="relative flex flex-col gap-3  bg-black  py-24  text-white">
			<h2 className="absolute left-5 top-5 border-b-2 border-r-2 border-red-600 p-3 px-10 text-2xl font-bold text-red-600">
				Opis
			</h2>
			<Suspense>{getProductDesc()}</Suspense>
		</section>
	);
}
