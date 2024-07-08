import Image from "next/image";
import Link from "next/link";

type ProductDisplayProps = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	salePrice: number;
	category: string;
};

export default function ProductDisplay({
	name,
	price,
	imageUrl,
	category,
	salePrice,
	id
}: ProductDisplayProps) {
	return (
		<Link
			href={`/product/${id}`}
			className=" flex-[0_0_100%] border-8 border-zinc-900 lg:flex-[1_0_33%]"
		>
			<div className="group flex cursor-pointer flex-col items-center justify-center">
				<div className="relative flex w-full flex-1 flex-col bg-black p-8 ">
					<div className="h-[300px] lg:h-[400px]">
						<Image
							src={imageUrl}
							alt={name}
							width={600}
							height={600}
							className="h-full w-full bg-red-400 object-contain p-10  transition group-hover:scale-105"
						/>
					</div>

					<div className="ml-6 mt-2 flex w-full flex-col text-white">
						<h2>{name}</h2>
					</div>

					<div className="absolute bottom-0 left-2  flex items-center justify-center  transition group-hover:-translate-y-1">
						<p
							className={`bg-white p-2 ${salePrice ? "line-through decoration-red-600 decoration-4 " : ""}`}
						>
							{salePrice ? salePrice : price}zł
						</p>
					</div>
					{salePrice && <p className="absolute bottom-2 right-2 font-bold text-red-600">ON SALE</p>}
				</div>
			</div>
		</Link>
	);
}
