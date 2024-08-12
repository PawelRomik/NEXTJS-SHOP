"use client";

import { useState, useCallback, Suspense } from "react";
import Image from "next/image";
import {
	Carousel,
	CarouselItem,
	CarouselContent,
	CarouselPrevious,
	CarouselNext
} from "@/components/ui/carousel";
import ProductImages from "./ProductImages";
import { useTranslation } from "react-i18next";

type ProductShowcaseGalleryProps = {
	productId: string;
};

export default function ProductShowcaseGallery({ productId }: ProductShowcaseGalleryProps) {
	const { t } = useTranslation();
	const [mainPhotoSrc, setMainPhotoSrc] = useState<string>("");
	const [productImages, setProductImages] = useState<any[]>([]);

	const changeMainPhotoSrc = (id: number) => {
		setMainPhotoSrc(productImages[id].attributes.url);
	};

	const handleImagesLoaded = useCallback((images: any[], mainImageSrc: string) => {
		setProductImages(images);
		setMainPhotoSrc(mainImageSrc);
	}, []);

	return (
		<Suspense>
			<ProductImages productId={productId} onImagesLoaded={handleImagesLoaded} />
			<div className="flex h-[500px] w-full flex-col items-center justify-end lg:h-[700px]">
				<div className="flex max-h-[300px] items-center justify-center lg:max-h-[500px]">
					<Image
						width={600}
						height={600}
						src={`${process.env.NEXT_PUBLIC_PROD_PATH}${mainPhotoSrc}`}
						alt={t("product:mainImage")}
						className="h-[100%] object-contain p-6"
					/>
				</div>

				{productImages.length > 1 && (
					<Carousel className="w-[60%] pb-5 lg:w-[30%]">
						<CarouselContent className={`${productImages.length == 2 ? "justify-center" : ""}`}>
							{productImages.map((image, index) => (
								<CarouselItem key={index} className={`basis-1/3 cursor-pointer `}>
									<Image
										width={600}
										height={600}
										src={`${process.env.NEXT_PUBLIC_PROD_PATH}${image.attributes.url}`}
										alt={`${t("product:productImage")} ${index + 1}`}
										className={`h-[100%] border-2 object-cover p-2 transition hover:p-1 lg:p-4 hover:lg:p-3 ${mainPhotoSrc === image.attributes.url ? "border-red-500" : "border-zinc-800"}`}
										onClick={() => changeMainPhotoSrc(index)}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						{productImages.length > 3 && (
							<>
								<CarouselPrevious className="border-red-600 bg-red-600 text-white hover:border-red-500 hover:bg-red-500 hover:text-white" />
								<CarouselNext className="border-red-600 bg-red-600 text-white hover:border-red-500 hover:bg-red-500 hover:text-white" />
							</>
						)}
					</Carousel>
				)}
			</div>
		</Suspense>
	);
}
