import Image from "next/image";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import BuyButton from "../../../../components/BuyButton";
import { QueryResultSingle } from "../../../../queries/productType";
import { GET_OTHER_PRODUCTS, GET_PRODUCT_BY_ID } from "../../../../queries/productPage";
import { Metadata } from "next";
import ProductDisplay from "../../../../components/ProductDisplay";
import { QueryResult } from "../../../../queries/productType";
import ScrollBuyButton from "../../../../components/ScrollBuyButton";
import ProductNavigationButtons from "../../../../components/ProductNavigationButtons";

async function fetchProduct(productId: string) {
	const client = createApolloClient();

	const { data }: ApolloQueryResult<QueryResultSingle> = await client.query({
		query: GET_PRODUCT_BY_ID,
		variables: {
			productId
		}
	});

	const currProduct = data.product.data;
	return currProduct;
}

export async function generateMetadata({
	params
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const { productId } = params;
	const product = await fetchProduct(productId);

	return {
		title: `${product.attributes.name} | Ephonix`
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	async function fetchProducts(productId: string, category: string) {
		const client = createApolloClient();
		try {
			const { data }: ApolloQueryResult<QueryResult> = await client.query({
				query: GET_OTHER_PRODUCTS,
				variables: {
					productId: productId,
					category: category
				}
			});

			return data.products;
		} catch {
			return null;
		}
	}

	async function loadProducts(productId: string, category: string) {
		const data = await fetchProducts(productId, category);
		if (!data) return null;

		return (
			<>
				{data.data.map((product) => (
					<ProductDisplay
						id={product.id}
						name={product.attributes.name}
						desc={product.attributes.desc}
						price={product.attributes.price}
						salePrice={product.attributes.salePrice}
						category={product.attributes.categories.data[0].attributes.name}
						imageUrl={`${process.env.NEXT_PUBLIC_PROD_PATH}${product.attributes.images.data[0].attributes.url}`}
						key={product.id}
						type={"fixed"}
					></ProductDisplay>
				))}
			</>
		);
	}

	revalidatePath("/product/[productId]", "page");
	const productId = params.productId;
	const currProduct = (await fetchProduct(productId)).attributes;
	console.log(currProduct.images.data[0].attributes.url);

	const extractText = (text: string) => {
		const startIndex = text.indexOf("--START--") + "--START--".length;
		const endIndex = text.indexOf(".");
		return text.slice(startIndex, endIndex).trim() + ".";
	};

	if (!currProduct) return;

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
						return `<strong>${part.substring(2, part.length - 2)}</strong>`;
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
									className="h-full object-contain p-6"
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
									className="h-full object-contain p-6"
								/>
							)}
						</>
					)}
				</div>
			);
		});
	};

	const lines = currProduct.technical.trim().split("\n");

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
		<main className=" flex w-full flex-col gap-3 bg-zinc-950">
			<ScrollBuyButton currProductProp={currProduct} />
			<ProductNavigationButtons />
			<section id="product" className=" relative flex w-full flex-col lg:flex-row  lg:gap-3">
				<h2 className="absolute left-5 top-5 border-b-2 border-r-2 border-red-600 p-2 px-10 text-2xl font-bold text-red-600">
					Produkt
				</h2>
				<div className="flex flex-[60%] items-center justify-center bg-black pt-12">
					<Image
						width={600}
						height={600}
						src={`${process.env.NEXT_PUBLIC_PROD_PATH}${currProduct.images.data[0].attributes.url}`}
						alt={currProduct.name}
						className="h-[100%] object-contain p-6"
					/>
				</div>

				<div className="flex flex-[40%] flex-col justify-between  bg-black px-6 py-6 text-white lg:px-20 lg:py-32">
					<div className="flex flex-col gap-3">
						<h1 className="text-4xl font-bold uppercase">{currProduct.name}</h1>
						<h2 className="uppercase text-red-600">
							{currProduct.categories.data[0].attributes.name}
						</h2>
						<p>{extractText(currProduct.desc)}</p>
					</div>
					<div className="mr-4 flex flex-col items-end justify-center gap-3 lg:items-start">
						<p className="text-3xl font-bold">PLN {currProduct.price}</p>
						<BuyButton currProductProp={currProduct} />
					</div>
				</div>
			</section>

			<section
				id="description"
				className="relative flex flex-col gap-3  bg-black  py-24  text-white"
			>
				<h2 className="absolute left-5 top-5 border-b-2 border-r-2 border-red-600 p-3 px-10 text-2xl font-bold text-red-600">
					Opis
				</h2>
				{renderSections()}
			</section>

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

			<section
				id="others"
				className="relative flex w-full flex-col bg-black  p-3  pt-24 text-white "
			>
				<h2 className="absolute left-5 top-5 border-b-2 border-r-2 border-red-600 p-3 px-10 text-2xl font-bold text-red-600">
					Inne Produkty
				</h2>
				<div className="relative w-full overflow-hidden lg:static lg:flex-1">
					<div className="flex gap-6 overflow-x-auto py-2 lg:static">
						{loadProducts(productId, currProduct.categories.data[0].attributes.slug)}
					</div>
				</div>
			</section>
		</main>
	);
}
