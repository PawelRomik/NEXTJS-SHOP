"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCurrency } from "../../context/CurrencyProvider";
import { SignedIn } from "@clerk/nextjs";
import { ProductData } from "../../queries/productType";
import CartCounter from "../cart/CartCounter";

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
	uuid,
	name,
	display,
	price,
	products
}: BundleDisplayProps) {
	const t = useTranslations();
	const { exchangeRate } = useCurrency();
	const productCount = products.data.length;

	let productPrice = 0;
	products.data.map((product) => (productPrice += product.attributes.price));

	return (
		<div
			className={`max-w-[400px] overflow-hidden rounded-[40px] border-4 border-red-600 bg-[rgb(12,12,12)] transition hover:border-red-500 `}
		>
			<div className="group flex h-full  flex-col  items-center justify-start">
				<div className="flex h-full w-full flex-col justify-between   ">
					<Link href={`/product/${uuid}`} title="Check" className="w-full">
						<div className="relative w-full bg-[rgb(12,12,12)]    ">
							<Image
								src={`${process.env.NEXT_PUBLIC_STRAPI_PATH}${display}`}
								alt={name}
								width={600}
								height={600}
								className="h-[300px]  object-contain p-6  transition group-hover:scale-105"
							/>
						</div>
					</Link>

					<div className="flex h-full w-full flex-col justify-between shadow-[0px_13px_16px_-3px_rgba(0,0,0,0.6)_inset]">
						<div className="flex w-full  flex-col bg-red-600 py-4 pl-6 text-2xl font-bold uppercase text-white">
							<h2>{name}</h2>
						</div>
						<div className=" flex flex-1 flex-col  text-white">
							<ul className="flex w-full flex-col bg-[rgb(8,8,8)] uppercase">
								{products.data.slice(0, 4).map((prod, i) => (
									<Link key={i} href={`/product/${prod.attributes.uuid}`}>
										<li
											className={`${i % 2 === 0 ? "bg-[rgb(16,16,16)]" : ""} py-2 pl-6 pr-2 transition-all hover:scale-105 hover:bg-[rgb(24,24,24)]`}
										>
											{products.data.length > 4 && i == 3 ? "And More!" : prod.attributes.name}
										</li>
									</Link>
								))}
							</ul>
							<div className="h-[5px] bg-[rgb(27,27,27)]"></div>
						</div>

						<div className="my-4 flex w-full flex-col items-center justify-end p-2 pl-6 pt-4">
							<div className="flex w-full items-center justify-center ">
								<p className="flex w-full items-end gap-3 text-2xl font-bold text-white">
									<span className="text-lg text-red-600 line-through">
										{t("product.price", { amount: formatPrice(productPrice, exchangeRate) })}
									</span>
									<span>{t("product.price", { amount: formatPrice(price, exchangeRate) })}</span>
								</p>
								<SignedIn>
									<CartCounter productId={uuid}></CartCounter>
								</SignedIn>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
