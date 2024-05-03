import Image from "next/image";
import Link from "next/link";

type ProductDisplayProps = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	category: string;
};

export default function ProductDisplay({
	name,
	price,
	imageUrl,
	category,
	id,
}: ProductDisplayProps) {
	return (
		<Link href={`/product/${id}`}>
			<div className="group flex cursor-pointer flex-col items-center justify-center">
				<div className="relative w-full flex-1 bg-zinc-100 p-8">
					<div className="h-[400px]">
						<Image
							fill={true}
							src={imageUrl}
							alt={name}
							className=" p-10 transition group-hover:scale-105"
						/>
					</div>

					<p className="absolute bottom-0 left-2 bg-white p-2 transition group-hover:-translate-y-1">
						{price}zł
					</p>
				</div>
				<div className="ml-6 mt-2 flex w-full flex-col">
					<h2>{name}</h2>
					<h3 className="text-zinc-400">{category}</h3>
				</div>
			</div>
		</Link>
	);
}
