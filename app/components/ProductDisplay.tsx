import Image from "next/image";
import Link from "next/link";

type ProductDisplayProps = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	onSale: boolean;
	salePrice: number;
	category: string;
};

export default function ProductDisplay({
	name,
	price,
	imageUrl,
	category,
	salePrice,
	onSale,
	id
}: ProductDisplayProps) {
	return (
		<Link href={`/product/${id}`} className=" flex-[0_0_100%] lg:flex-[1_0_33%]">
			<div className="group flex cursor-pointer flex-col items-center justify-center">
				<div className="relative w-full flex-1 bg-zinc-100 p-8">
					<div className="h-[300px] lg:h-[400px]">
						<Image
							fill={true}
							src={imageUrl}
							alt={name}
							className=" p-10 transition group-hover:scale-105"
						/>
					</div>

					<div className="absolute bottom-0 left-2  flex items-center justify-center  transition group-hover:-translate-y-1">
						<p
							className={`bg-white p-2 ${onSale ? "line-through decoration-red-600 decoration-4 " : ""}`}
						>
							{price}zł
						</p>

						{onSale && <p className="bg-red-600 p-2 text-white ">{salePrice}zł</p>}
					</div>
					{onSale && <p className="absolute bottom-2 right-2 font-bold text-red-600">ON SALE</p>}
				</div>
				<div className="ml-6 mt-2 flex w-full flex-col">
					<h2>{name}</h2>
					<h3 className="text-zinc-400">{category}</h3>
				</div>
			</div>
		</Link>
	);
}
