"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCurrency } from "../../lib/context/CurrencyProvider";
import CartCounter from "./CartCounter";
import { SignedIn } from "@clerk/nextjs";

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
	const t = useTranslations();
	const { exchangeRate } = useCurrency();

	const extractText = (text: string) => {
		const startIndex = text.indexOf("--START--") + "--START--".length;
		const endIndex = text.indexOf(".");
		return text.slice(startIndex, endIndex).trim() + ".";
	};

	return (
		<div
			className={`h-[680px] max-w-[400px] overflow-hidden rounded-[40px] border-4 border-red-600 bg-[rgb(12,12,12)] transition hover:border-red-500 `}
		>
			<div className="group flex h-full  flex-col  items-center justify-start">
				<div className="flex h-full w-full flex-col justify-between   ">
					<Link href={`/product/${uuid}`} title="Check" className="w-full">
						<div className="relative w-full bg-[rgb(12,12,12)]    ">
							{salePrice && (
								<div className="absolute left-[-30%] top-[10%] z-[2] flex w-full rotate-[-30deg] items-center justify-center bg-red-700 p-2 text-2xl font-bold  uppercase tracking-widest">
									{t("product.sale")}
								</div>
							)}
							<Image
								src={`${process.env.NEXT_PUBLIC_STRAPI_PATH}${imageUrl}`}
								alt={name}
								width={600}
								height={600}
								className="h-[300px]  object-contain p-6  transition group-hover:scale-105"
							/>
						</div>
					</Link>

					<div className="flex h-full w-full flex-col justify-between shadow-[0px_13px_16px_-3px_rgba(0,0,0,0.6)_inset]">
						<div className="flex  w-full flex-col pl-6 pt-4 text-2xl font-bold text-white">
							<h2>{name}</h2>
						</div>
						<div className=" flex flex-1  pl-6 pr-2 pt-4 text-white">{extractText(desc)}</div>

						<div className="my-4 flex w-full flex-col items-center justify-end p-2 pl-6 pt-4">
							<div className="flex w-full items-center justify-center ">
								{salePrice ? (
									<div className="flex w-full flex-col items-start justify-around ">
										<p className="text-xl font-bold  text-red-600 line-through">
											{t("product.price", { amount: formatPrice(price, exchangeRate) })}
										</p>
										<span className="text-2xl font-bold">
											{t("product.price", { amount: formatPrice(salePrice, exchangeRate) })}
										</span>
									</div>
								) : (
									<p className="w-full text-2xl font-bold text-white">
										{t("product.price", { amount: formatPrice(price, exchangeRate) })}
									</p>
								)}
								<SignedIn>
									<CartCounter productId={uuid}></CartCounter>
								</SignedIn>
							</div>
							<div className="my-6 flex w-full items-center justify-center px-5">
								<Link
									href={`/product/${uuid}`}
									title={t("productSection.check")}
									className="flex h-full w-full items-center justify-center"
								>
									<button
										className="flex h-full w-[80%] items-center justify-center rounded-full bg-red-600 p-3 font-bold text-white hover:scale-105 hover:bg-red-500
"
									>
										{t("productSection.check")}
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
