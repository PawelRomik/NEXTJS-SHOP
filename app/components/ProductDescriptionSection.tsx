import Image from "next/image";
import createApolloClient from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_PRODUCT_DESC } from "../queries/productPage";
import { Suspense } from "react";
import { QueryResult } from "../queries/productType";
import { useTranslations } from "next-intl";

type ProductDescriptionSectionProps = {
	productId: string;
	locale: string;
};

export default function ProductDescriptionSection({
	productId,
	locale
}: ProductDescriptionSectionProps) {
	const t = useTranslations("product");

	async function getProductDesc() {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_PRODUCT_DESC,
				variables: {
					productId: productId,
					locale: locale
				}
			});

			const currProduct = data.products.data[0].attributes;
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

					const bgClass = index % 2 === 0 ? "bg-[rgb(12,12,14)]" : "";

					return (
						<div
							key={index}
							className={`flex flex-col items-center justify-between text-xl lg:flex-row ${bgClass}`}
						>
							{imageFirst ? (
								<div className="flex h-[200px] max-h-[200px] w-full items-center justify-between px-6 py-6 lg:px-32">
									{imageUrl && (
										<Image
											width={600}
											height={600}
											src={imageUrl}
											alt={t("productImage")}
											className="h-full max-h-[300px] object-contain p-2"
										/>
									)}
									<div
										className="description flex-1 "
										dangerouslySetInnerHTML={{ __html: description }}
									/>
								</div>
							) : (
								<div className="flex h-[200px] max-h-[200px] w-full items-center justify-between px-6 py-6 lg:px-32">
									<div
										className="description flex-1"
										dangerouslySetInnerHTML={{ __html: description }}
									/>
									{imageUrl && (
										<Image
											width={600}
											height={600}
											src={imageUrl}
											alt={t("productImage")}
											className="h-full max-h-[300px] object-contain p-2"
										/>
									)}
								</div>
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
		<section
			id="description"
			className="shadow-inset   relative flex flex-col  bg-zinc-950   text-white"
		>
			<Suspense>{getProductDesc()}</Suspense>
		</section>
	);
}
