import SizePicker from "../../../../components/SizePicker";
import products from "../../../../data/products";
import Image from "next/image";
import ProductDisplay from "../../../../components/ProductDisplay";

export default function ProductPage({ params }: { params: { productId: string } }) {
	const currProduct = products.find((product) => product.id === params.productId);
	if (!currProduct) return;

	return (
		<div className="flex flex-1 flex-col items-stretch justify-start gap-6 lg:flex-row">
			<div className="bg-red flex h-full w-full flex-[2_2_0%] flex-col items-start justify-center p-6">
				<div className="flex h-full w-full items-center justify-center">
					<Image
						src={currProduct?.imageUrl}
						alt={currProduct?.name}
						className="w-[50%] object-cover"
					></Image>
				</div>

				<div className="flex flex-col">
					<h2 className="my-6 text-4xl font-bold">Check other products!</h2>
					<div className="flex items-center justify-center gap-6">
						{products.slice(3, 6).map((product) => (
							<ProductDisplay
								id={product.id}
								name={product.name}
								price={product.price}
								category={product.category}
								imageUrl={product.imageUrl}
								key={product.id}
							></ProductDisplay>
						))}
					</div>
				</div>
			</div>

			<div
				className="right-0 top-0 flex flex-1 
			 bg-zinc-900 p-6 pl-20"
			>
				<div className="sticky top-[15%] flex h-full max-h-[50%] flex-col justify-around">
					<div className="flex flex-col items-start justify-center gap-1">
						<h3 className="text-2xl text-zinc-300">{currProduct?.category}</h3>
						<h1 className="text-4xl font-bold text-white">{currProduct?.name}</h1>
						<h3 className="text-1xlfont-bold italic text-white">{currProduct?.price}zł</h3>
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
