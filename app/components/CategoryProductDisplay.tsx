"use client";
import Image from "next/image";
import Link from "next/link";
import BuyButton from "./BuyButton";
import { useTranslations } from "next-intl";
import { formatPrice } from "../lib/utils/formatPrice";
import { useCurrency } from "../context/CurrencyProvider";

type ProductDisplayProps = {
	uuid: string;
	name: string;
	price: number;
	imageUrl: string;
	salePrice: number;
	category: string;
	desc: string;
};

export default function CategoryProductDisplay({
	name,
	price,
	imageUrl,
	salePrice,
	desc,
	uuid
}: ProductDisplayProps) {
	const t = useTranslations("product");
	const { exchangeRate } = useCurrency();

	const extractText = (text: string) => {
		const startIndex = text.indexOf("--START--") + "--START--".length;
		const endIndex = text.indexOf(".");
		return text.slice(startIndex, endIndex).trim() + ".";
	};

	return (
		<Link
			href={`/product/${uuid}`}
			className={`max-w-[400px] overflow-hidden rounded-[20px] border-4   border-[rgb(15,15,20)] bg-[rgb(15,15,20)] transition hover:border-red-600 `}
		>
			<div className="group flex h-full cursor-pointer flex-col  items-center justify-start">
				<div className="flex h-full w-full flex-col justify-between   ">
					<div className="w-full bg-[rgb(25,25,30)]    ">
						<Image
							src={`${process.env.NEXT_PUBLIC_PROD_PATH}${imageUrl}`}
							alt={name}
							width={600}
							height={600}
							className="h-[300px]  object-contain p-6  transition group-hover:scale-105"
						/>
					</div>

					<div className="flex h-full w-full flex-col justify-between shadow-[0px_13px_16px_-3px_rgba(0,0,0,0.3)_inset]">
						<div className="flex  w-full flex-col pl-6 pt-4 text-2xl font-bold text-white">
							<h2>{name}</h2>
						</div>
						<div className=" pl-6 pt-4 text-white">{extractText(desc)}</div>

						<div className="my-4 flex w-full flex-col items-center justify-end p-2 pl-6 pt-4">
							<div className="flex w-[60%] justify-between">
								{salePrice ? (
									<div className="flex w-full items-center justify-around ">
										<p className="text-xl font-bold  text-red-600 line-through">
											{t("price", { amount: formatPrice(price, exchangeRate) })}
										</p>
										<span className="text-2xl font-bold">
											{t("price", { amount: formatPrice(salePrice, exchangeRate) })}
										</span>
									</div>
								) : (
									<p className="w-full text-2xl font-bold text-white">
										{t("price", { amount: formatPrice(price, exchangeRate) })}
									</p>
								)}
							</div>
							<div className="my-6 flex w-full items-center justify-center px-5">
								<BuyButton productId={uuid} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
