import Link from "next/link";
import { ProductData } from "../../queries/productType";

type BundleProductsProps = {
	products: {
		data: ProductData[];
	};
};

export default function BundleProducts({ products }: BundleProductsProps) {
	return (
		<div className=" flex flex-1 flex-col  text-white">
			<ul className="flex w-full flex-col bg-[rgb(8,8,8)] uppercase">
				{products.data.slice(0, 4).map((prod, i) => (
					<li
						key={prod.attributes.uuid}
						className={`${i % 2 === 0 ? "bg-[rgb(16,16,16)]" : ""} py-2 pl-6 pr-2 transition-all hover:scale-105 hover:bg-[rgb(24,24,24)]`}
					>
						<Link href={`/product/${prod.attributes.uuid}`} className="block w-full">
							{products.data.length > 4 && i === 3 ? "And More!" : prod.attributes.name}
						</Link>
					</li>
				))}
			</ul>
			<div className="h-[5px] bg-[rgb(27,27,27)]"></div>
		</div>
	);
}
