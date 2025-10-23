"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

type ProductImageProps = {
	name: string;
	imageUrl: string;
	salePrice?: number;
};

export const ProductImage = ({ name, imageUrl, salePrice }: ProductImageProps) => {
	const t = useTranslations();
	return (
		<div className="relative w-full bg-[rgb(12,12,12)]">
			{salePrice && (
				<div className="absolute left-[-30%] top-[10%] z-[2] flex w-full rotate-[-30deg] items-center justify-center bg-red-700 p-2 text-2xl font-bold uppercase tracking-widest">
					{t("product.sale")}
				</div>
			)}
			<Image
				src={`${process.env.NEXT_PUBLIC_STRAPI_PATH}${imageUrl}`}
				alt={name}
				width={600}
				height={600}
				className="h-[300px] object-contain p-6 transition group-hover:scale-105"
			/>
		</div>
	);
};
