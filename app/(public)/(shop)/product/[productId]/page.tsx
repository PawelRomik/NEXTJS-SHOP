import SizePicker from "../../../../components/SizePicker";
import Image from "next/image";
import { gql, ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";
import ProductDisplay from "../../../../components/ProductDisplay";

interface ProductData {
	id: string;
	attributes: {
		name: string;
		price: number;
		desc: string;
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
		sexes: {
			data: {
				attributes: {
					sex: string;
				};
			}[];
		};
		categories: {
			data: {
				attributes: {
					name: string;
					slug: string;
				};
			}[];
		};
	};
}

type QueryResult = {
	product: {
		data: ProductData;
	};
};

type otherQueryResult = {
	products: {
		data: ProductData[];
	};
};

const GET_PRODUCT = gql`
	query getProduct($productId: ID!) {
		product(id: $productId) {
			data {
				id
				attributes {
					name
					price
					desc
					image {
						data {
							attributes {
								url
							}
						}
					}
					categories {
						data {
							attributes {
								name
								slug
							}
						}
					}
					sexes {
						data {
							attributes {
								sex
							}
						}
					}
				}
			}
		}
	}
`;

const GET_OTHER_PRODUCTS = gql`
	query getProducts($productId: ID!, $category: String!, $sex: String!) {
		products(
			pagination: { limit: 5 }
			filters: {
				categories: { slug: { eq: $category } }
				sexes: { sex: { eq: $sex } }
				id: { ne: $productId }
			}
		) {
			data {
				id
				attributes {
					name
					price
					desc
					image {
						data {
							attributes {
								url
							}
						}
					}
					categories {
						data {
							attributes {
								name
							}
						}
					}
				}
			}
		}
	}
`;

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const productId = params.productId;

	const client = createApolloClient();
	const { data }: ApolloQueryResult<QueryResult> = await client.query({
		query: GET_PRODUCT,
		variables: {
			productId
		}
	});

	const currProduct = data.product.data;

	console.log(currProduct.attributes.categories.data[1].attributes.name);

	const otherData: ApolloQueryResult<otherQueryResult> = await client.query({
		query: GET_OTHER_PRODUCTS,
		variables: {
			productId: productId,
			category: currProduct.attributes.categories.data[1].attributes.slug,
			sex: currProduct.attributes.sexes.data[0].attributes.sex
		}
	});

	const products: ProductData[] = otherData.data.products.data;

	if (!currProduct || !products) return;

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
				<h1 className="mb-6 mt-3 w-full text-4xl font-bold text-black">
					{currProduct?.attributes.name}
				</h1>
				<div className="flex h-full w-full items-center justify-center border-2 bg-zinc-100">
					<Image
						width={400}
						height={400}
						src={`${process.env.PROD_PATH}${currProduct?.attributes.image.data.attributes.url}`}
						alt={currProduct?.attributes.name}
						className="w-[100%] object-cover p-10 lg:w-[50%]"
					></Image>
				</div>
				<div className="mt-3 flex w-full flex-col items-center justify-center gap-3 lg:hidden">
					<SizePicker />
					<div className="flex items-center justify-center gap-6">
						<button
							className="w-[10rem] rounded-full bg-black
p-4 text-white"
						>
							BUY
						</button>{" "}
						<p className="font-bold">{currProduct?.attributes.price}zł</p>
					</div>
				</div>

				<div className="flex flex-col">
					<h2 className="my-6 border-b-2 pb-2 text-4xl font-bold">About</h2>
					<p>{currProduct?.attributes.desc}</p>
					<h2 className="my-6 border-b-2 pb-2 text-4xl font-bold">Check other products!</h2>
					<div className="relative h-[400px] w-full overflow-hidden lg:static lg:flex-1">
						<div className="absolute left-0 top-0 flex max-w-[100%] gap-6 overflow-x-auto lg:static">
							{products.map((product) => (
								<ProductDisplay
									id={product.id}
									name={product.attributes.name}
									price={product.attributes.price}
									category={product.attributes.categories.data[1].attributes.name}
									imageUrl={`${process.env.PROD_PATH}${product.attributes.image.data.attributes.url}`}
									key={product.id}
								></ProductDisplay>
							))}
						</div>
					</div>
				</div>
			</div>

			<div
				className="right-0 top-0 hidden 
flex-1 bg-zinc-900 p-6 pl-20 lg:flex"
			>
				<div className="sticky top-[20%] flex h-full max-h-[50%] flex-col justify-around">
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
						<h3 className="text-1xlfont-bold italic text-white">
							{currProduct?.attributes.price}zł
						</h3>
					</div>
					<SizePicker />
					<div className="flex w-full items-center justify-center">
						<button
							className="w-[50%] rounded-full bg-black
p-4 text-white"
						>
							BUY
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
