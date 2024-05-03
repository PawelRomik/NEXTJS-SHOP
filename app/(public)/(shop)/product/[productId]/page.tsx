import SizePicker from "../../../../components/SizePicker";
import Image from "next/image";
import { gql, ApolloQueryResult } from "@apollo/client";
import createApolloClient from "../../../../../apollo-client";

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
		categories: {
			data: {
				attributes: {
					name: string;
				};
			}[];
		};
	};
}

interface QueryResult {
	product: {
		data: ProductData;
	};
}

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
			productId,
		},
	});
	const currProduct = data.product.data;
	console.log(currProduct?.attributes.image.data.attributes.url);
	if (!data) return;

	return (
		<div className="flex flex-1 flex-col items-stretch justify-start gap-6 lg:flex-row">
			<div className="bg-red flex h-full w-full flex-[2_2_0%] flex-col items-start justify-center p-6">
				<div className="flex h-full w-full items-center justify-center border-2 bg-zinc-100">
					<Image
						width={400}
						height={400}
						src={`${process.env.PROD_PATH}${currProduct?.attributes.image.data.attributes.url}`}
						alt={currProduct?.attributes.name}
						className="w-[50%] object-cover p-10"
					></Image>
				</div>

				<div className="flex flex-col">
					<h2 className="my-6 border-b-2 pb-2 text-4xl font-bold">About</h2>
					<p>{currProduct?.attributes.desc}</p>
					<h2 className="my-6 border-b-2 pb-2 text-4xl font-bold">Check other products!</h2>
					<div className="flex items-center justify-center gap-6">
						{/*products.slice(3, 6).map((product) => (
							<ProductDisplay
								id={product.id}
								name={product.name}
								price={product.price}
								category={product.category}
								imageUrl={product.imageUrl}
								key={product.id}
							></ProductDisplay>
						))*/}
					</div>
				</div>
			</div>

			<div
				className="right-0 top-0 flex flex-1 
bg-zinc-900 p-6 pl-20"
			>
				<div className="sticky top-[20%] flex h-full max-h-[50%] flex-col justify-around">
					<div className="flex flex-col items-start justify-center gap-1">
						<h3 className="text-2xl text-zinc-300">
							{currProduct?.attributes.categories.data.map((category, index) => (
								<span key={index}>
									{category.attributes.name}
									{index !== currProduct.attributes.categories.data.length - 1 && (
										<i className="ri-circle-fill mx-2 align-middle text-[0.5rem]"></i>
									)}
								</span>
							))}
						</h3>
						<h1 className="text-4xl font-bold text-white">{currProduct?.attributes.name}</h1>
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
