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

	let productPrice = 0;
	products.data.map((product) => (productPrice += product.attributes.price));

	return (
		<div className="flex  flex-col overflow-hidden rounded-2xl border-[3px] border-red-600 bg-[rgb(8,8,8)]">
			<h2 className="w-full bg-red-600  py-3 text-center text-3xl font-bold uppercase">
				{name ? name : "Bundle"}
			</h2>
			<div className="shadow-inset h-[300px] w-full  bg-[rgb(26,26,26)]">
				<Image
					src={`${process.env.NEXT_PUBLIC_PROD_PATH}${display}`}
					width={200}
					height={100}
					alt="bundle image"
					className=" mx-auto h-[300px] object-contain"
				></Image>
			</div>

			<div className=" flex flex-col justify-center gap-1 py-6">
				{products.data.map((product, index) => (
					<Link
						href={`/product/${product.attributes.uuid}`}
						className="overflow-hidden  bg-[rgb(26,26,26)] transition  hover:bg-[rgb(32,32,32)]"
						title="product page"
						key={index}
					>
						<div key={`productImage-${index}`} className="h-full w-full p-2    text-center ">
							{product.attributes.name}
						</div>
					</Link>
				))}
			</div>
			<div className="z-10 mx-2 flex  items-center justify-between pb-3 ">
				<div className="flex gap-3 rounded-lg bg-red-600 px-2 py-1">
					<span className="text-red-300 line-through">
						{t("product.price", { amount: formatPrice(productPrice, exchangeRate) })}
					</span>
					<span className="font-bold">
						{t("product.price", { amount: formatPrice(price, exchangeRate) })}
					</span>
				</div>
				<SignedIn>
					<div className="flex gap-3">
						<button
							title={t("shop.buyButtonText")}
							className="ignore-popover-close h-[2rem] rounded-lg bg-red-600 px-3 font-bold uppercase text-white hover:scale-105 hover:bg-red-500 "
						>
							BUY <i className="ri-shopping-cart-2-line "></i>
						</button>
					</div>
				</SignedIn>
			</div>
		</div>
	);
}
