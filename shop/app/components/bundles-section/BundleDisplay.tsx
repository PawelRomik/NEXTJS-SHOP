import { ProductData } from "../../queries/productType";
import BundleImage from "./BundleImage";
import BundleTitle from "./BundleTitle";
import BundleProducts from "./BundleProducts";
import BundlePrice from "./BundlePrice";

type BundleDisplayProps = {
	uuid: string;
	name: string;
	price: number;
	display: string;
	products: {
		data: ProductData[];
	};
};

export default function BundleDisplay({
	name,
	display,
	products,
	uuid,
	price
}: BundleDisplayProps) {
	return (
		<div
			className={`max-w-[400px] overflow-hidden rounded-[40px] border-4 border-red-600 bg-[rgb(12,12,12)] transition hover:border-red-500 `}
		>
			<div className="group flex h-full  flex-col  items-center justify-start">
				<div className="flex h-full w-full flex-col justify-between   ">
					<BundleImage display={display} name={name} />
					<div className="flex h-full w-full flex-col justify-between shadow-[0px_13px_16px_-3px_rgba(0,0,0,0.6)_inset]">
						<BundleTitle name={name} />
						<BundleProducts products={products} />
						<BundlePrice products={products} uuid={uuid} price={price} />
					</div>
				</div>
			</div>
		</div>
	);
}
