import SizePicker from "../../../../components/SizePicker";
import Image from "next/image";
import { ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import { revalidatePath } from "next/cache";
import BuyButton from "../../../../components/BuyButton";
import { QueryResultSingle } from "../../../../queries/productType";
import { GET_PRODUCT_BY_ID } from "../../../../queries/productPage";
import { Metadata } from "next";

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
		title: `N3XT | ${product.attributes.name}`
	};
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
	revalidatePath("/product/[productId]", "page");
	const productId = params.productId;
	const currProduct = await fetchProduct(productId);

	if (!currProduct) return;

	return (
		<div className="flex flex-1 flex-col items-stretch justify-start gap-6  lg:flex-row">
			<div className="bg-red flex h-full w-full flex-[2_2_0%] flex-col items-start justify-center p-6">
				<h3 className="text-2xl text-zinc-300 lg:hidden">
					{currProduct?.attributes.categories.data.map((category, index) => (
						<span key={index}>
							{category.attributes.name}
							{index !== currProduct.attributes.categories.data.length - 1 && (
								<i className="ri-circle-fill mx-2 align-middle text-[0.5rem]"></i>
							)}
						</span>
					))}
				</h3>
				<h1 className="mb-6 mt-3 flex w-full flex-col justify-between  text-4xl font-bold text-black lg:flex-row lg:items-center">
					<span>{currProduct?.attributes.name}</span>
					{currProduct.attributes.onSale && (
						<span className="text-2xl text-red-600 lg:text-4xl">ON SALE</span>
					)}
				</h1>
				<div className="flex h-full w-full items-center justify-center border-2 bg-zinc-100">
					<Image
						width={400}
						height={400}
						src={`${process.env.NEXT_PUBLIC_PROD_PATH}${currProduct?.attributes.images.data[0].attributes.url}`}
						alt={currProduct?.attributes.name}
						className="w-[100%] object-cover p-10 lg:w-[50%]"
					></Image>
				</div>
				<div className="mt-3 flex w-full flex-col items-center justify-center gap-3 lg:hidden">
					<SizePicker />
					<div className="flex items-center justify-center gap-6">
						<BuyButton currProductProp={currProduct} />
						<p className="flex flex-col font-bold">
							<span
								className={
									currProduct.attributes.onSale
										? "font-bold line-through decoration-red-600 decoration-4"
										: "font-bold"
								}
							>
								{currProduct?.attributes.price}zł
							</span>
							{currProduct.attributes.onSale && (
								<span className="text-2xl text-red-600">{currProduct?.attributes.salePrice}zł</span>
							)}
						</p>
					</div>
				</div>

				<div className="flex flex-col">
					<h2 className="my-6 border-b-2 pb-2 text-4xl font-bold">About</h2>
					<p>{currProduct?.attributes.desc}</p>
					<h2 className="my-6 border-b-2 pb-2 text-4xl font-bold">Check other products!</h2>
				</div>
			</div>

			<div
				className="right-0 top-0 hidden 
flex-1 bg-zinc-900 p-6 pl-20 lg:flex"
			>
				<div className="sticky top-[25%] flex h-full max-h-[30%] flex-col justify-around">
					<div className="flex flex-col items-start justify-center gap-1">
						<h3 className="hidden text-2xl text-zinc-300 lg:block ">
							{currProduct?.attributes.categories.data.map((category, index) => (
								<span key={index}>
									{category.attributes.name}
									{index !== currProduct.attributes.categories.data.length - 1 && (
										<i className="ri-circle-fill mx-2 align-middle text-[0.5rem]"></i>
									)}
								</span>
							))}
						</h3>
						<h1 className="hidden text-4xl font-bold text-white lg:block">
							{currProduct?.attributes.name}
						</h1>
						<h3 className="text-1xlfont-bold flex gap-3 italic text-white">
							<span
								className={
									currProduct.attributes.onSale
										? "line-through decoration-red-600 decoration-4"
										: ""
								}
							>
								{currProduct?.attributes.price}zł
							</span>

							<span className="text-2xl font-bold text-red-600">
								{currProduct.attributes.onSale ? `${currProduct?.attributes.salePrice}zł` : null}
							</span>
						</h3>
					</div>
					<SizePicker />
					<div className="flex w-full items-center justify-center">
						<BuyButton currProductProp={currProduct} />
					</div>
				</div>
			</div>
		</div>
	);
}
