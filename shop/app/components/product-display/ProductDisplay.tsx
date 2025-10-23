"use client";
import Link from "next/link";
import CartCounter from "../common/CartCounter";
import { SignedIn } from "@clerk/nextjs";
import { ProductImage } from "./ProductImage";
import { ProductDescription } from "./ProductDescription";
import { ProductPrice } from "./ProductPrice";
import { ProductButton } from "./ProductButton";

type ProductDisplayProps = {
	uuid: string;
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
	salePrice,
	desc,
	uuid
}: ProductDisplayProps) {
	return (
		<div
			className={`h-[680px] max-w-[400px] overflow-hidden rounded-[40px] border-4 border-red-600 bg-[rgb(12,12,12)] transition hover:border-red-500 `}
		>
			<div className="group flex h-full  flex-col  items-center justify-start">
				<div className="flex h-full w-full flex-col justify-between   ">
					<Link href={`/product/${uuid}`} title="Check" className="w-full">
						<ProductImage name={name} imageUrl={imageUrl} salePrice={salePrice} />
					</Link>

					<div className="flex h-full w-full flex-col justify-between shadow-[0px_13px_16px_-3px_rgba(0,0,0,0.6)_inset]">
						<ProductDescription name={name} desc={desc} />

						<div className="my-4 flex w-full flex-col items-center justify-end p-2 pl-6 pt-4">
							<div className="flex w-full items-center justify-center ">
								<ProductPrice price={price} salePrice={salePrice} />
								<SignedIn>
									<CartCounter productId={uuid}></CartCounter>
								</SignedIn>
							</div>
							<ProductButton uuid={uuid} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
