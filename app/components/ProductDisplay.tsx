import Image from "next/image";
import Link from "next/link";

type ProductDisplayProps = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	salePrice: number;
	category: string;
	desc: string;
};

export default function ProductDisplay({
	name,
	price,
	imageUrl,
	category,
	salePrice,
	desc,
	id
}: ProductDisplayProps) {
	const extractText = (text: string) => {
		const startIndex = text.indexOf("--START--") + "--START--".length;
		const endIndex = text.indexOf(".");
		return text.slice(startIndex, endIndex).trim() + ".";
	};

	return (
		<Link
			href={`/product/${id}`}
			className="border-4 border-zinc-900 transition hover:border-red-600"
		>
			<div className="group flex h-full cursor-pointer flex-col items-center justify-start">
				<div className="flex h-full w-full flex-col justify-between bg-black p-6 ">
					<div className="w-full">
						<Image
							src={imageUrl}
							alt={name}
							width={600}
							height={600}
							className="h-[100%] object-contain p-6  transition group-hover:scale-105"
						/>
					</div>

					<div className="flex w-full flex-col text-2xl font-bold text-white">
						<h2>{name}</h2>
					</div>
					<div className="mt-4 text-white">{extractText(desc)}</div>

					<div className="mt-8 flex items-end justify-between">
						<div className="flex flex-col justify-end">
							{salePrice ? (
								<>
									<div className="text-xl font-bold text-red-600">SALE</div>
									<p className="text-sm text-zinc-300">FROM: PLN {price}</p>
									<p className="flex items-end gap-2 text-xl font-bold text-white">
										{salePrice && <span>PLN {salePrice}</span>}
									</p>
								</>
							) : (
								<p className="flex items-end gap-2 text-xl font-bold text-white">PLN {price}</p>
							)}
						</div>

						<button className="bg-red-600 px-4 py-3 font-bold text-white hover:scale-105 hover:bg-red-500">
							Dodaj do koszyka
						</button>
					</div>
					{salePrice && <p className="absolute bottom-2 right-2 font-bold text-red-600">ON SALE</p>}
				</div>
			</div>
		</Link>
	);
}
