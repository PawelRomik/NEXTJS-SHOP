import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ProductDisplayProps = {
	id: string;
	name: string;
	price: number;
	imageUrl: StaticImageData;
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
				<div className="relative flex bg-zinc-100 p-8">
					<Image src={imageUrl} alt={name} className="h-[400px] transition group-hover:scale-105" />
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
