import Image from "next/image";
import { getApolloClient } from "../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { GET_PRODUCT_DESC } from "../../queries/productPage";
import { Suspense } from "react";
import { QueryResult } from "../../queries/productType";
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
			const client = await getApolloClient();
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

					const bgClass = index % 2 === 0 ? "bg-[rgb(16,16,16)]" : "";

					return (
						<div
							key={index}
							className={`flex flex-col items-center justify-between text-lg md:text-xl lg:flex-row ${bgClass}`}
						>
							<div className="lg:md-0 flex w-full flex-col items-center justify-between gap-5 px-6 py-3 md:h-[250px] md:max-h-[250px] md:flex-row lg:px-32">
								{imageFirst && imageUrl && (
									<div className="relative hidden h-full w-[250px] md:block">
										<Image
											layout="fill"
											objectFit="contain"
											src={imageUrl}
											className="p-4"
											alt={t("productImage")}
										/>
									</div>
								)}
								{imageUrl && (
									<div className="relative block h-[250px] w-[250px] md:hidden">
										<Image
											layout="fill"
											objectFit="contain"
											src={imageUrl}
											className="p-4"
											alt={t("productImage")}
										/>
									</div>
								)}
								<div
									className="description flex-1 "
									dangerouslySetInnerHTML={{ __html: description }}
								/>
								{!imageFirst && imageUrl && (
									<div className="relative hidden h-full w-[250px] md:block">
										<Image
											layout="fill"
											objectFit="contain"
											src={imageUrl}
											className="p-4"
											alt={t("productImage")}
										/>
									</div>
								)}
							</div>
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
			className="shadow-inset   relative flex flex-col  bg-[rgb(20,20,20)]  text-white"
		>
			<Suspense>{getProductDesc()}</Suspense>
		</section>
	);
}
