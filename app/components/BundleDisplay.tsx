"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatPrice } from "../lib/utils/formatPrice";
import { useCurrency } from "../context/CurrencyProvider";
import { SignedIn } from "@clerk/nextjs";
import { ProductData } from "../queries/productType";

type BundleDisplayProps = {
	name: string;
	price: number;
	display: string;
	products: {
		data: ProductData[];
	};
};

export default function BundleDisplay({ name, display, price, products }: BundleDisplayProps) {
	const t = useTranslations();
	const { exchangeRate } = useCurrency();
	const productCount = products.data.length;

	let cols = productCount > 6 ? 6 : productCount;
	let rows = Math.floor(productCount / 6);
	let productPrice = 0;
	products.data.map((product) => (productPrice += product.attributes.price));

	return (
		<div className="flex h-[300px] w-full -skew-x-6 rounded-lg border-2 border-red-600 bg-[rgb(8,8,8)]">
			<div
				className={`bg3d relative  flex flex-[${productCount > 2 ? 1 : 2}]  flex-col items-center justify-between`}
			>
				<h2 className="z-10 pt-3 text-center text-3xl font-bold uppercase">
					{name ? name : "Bundle"}
				</h2>
				<Image
					src={`${process.env.NEXT_PUBLIC_PROD_PATH}${display}`}
					width={200}
					height={100}
					alt="bundle image"
					className=" h-[200px] w-[250px]"
				></Image>
				<div className="z-10 flex items-center justify-center gap-3 pb-3 ">
					<span className="text-red-600 line-through">
						{t("product.price", { amount: formatPrice(productPrice, exchangeRate) })}
					</span>
					<span className="font-bold">
						{t("product.price", { amount: formatPrice(price, exchangeRate) })}
					</span>
					<SignedIn>
						<button
							title={t("shop.buyButtonText")}
							className="ignore-popover-close h-[2rem] w-[2rem] rounded-lg bg-red-600 text-white hover:scale-105 hover:bg-red-500 "
						>
							<i className="ri-shopping-cart-2-line "></i>
						</button>
					</SignedIn>
				</div>
			</div>
			<div
				className="grid flex-[1] justify-center gap-2 p-3"
				style={{
					gridTemplateColumns: `repeat(${cols}, 1fr)`,
					gridAutoRows: `repeat(${rows}, 1fr)`
				}}
			>
				{products.data.map((img, index) => (
					<Link
						href={`/product/${img.attributes.uuid}`}
						className="h-full w-full overflow-hidden  rounded-lg  border-2 border-red-600 bg-[rgb(20,20,20)] transition hover:scale-105 hover:bg-[rgb(32,32,32)]"
						title="product page"
					>
						<div key={`productImage-${index}`} className="h-full w-full    p-1 ">
							<Image
								src={`${process.env.NEXT_PUBLIC_PROD_PATH}${img.attributes.images.data[0].attributes.url}`}
								alt="product"
								width={200}
								height={200}
								className="h-full w-full rounded-md object-fill p-1"
							/>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
