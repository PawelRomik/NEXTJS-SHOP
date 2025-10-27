"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import MainProductImage from "./MainProductImage";
import ProductThumbnails from "./ProductThumbnails";

export default function ProductImages({ images }: { images: any[] }) {
	const t = useTranslations("product");
	const [mainPhotoSrc, setMainPhotoSrc] = useState(images[0]?.attributes.url);

	const handleThumbnailClick = (url: string) => {
		setMainPhotoSrc(url);
	};

	return (
		<div className="flex h-[500px] w-full flex-col items-center justify-end lg:h-[700px]">
			<MainProductImage src={mainPhotoSrc} />
			{images.length > 1 && (
				<ProductThumbnails
					images={images}
					activeSrc={mainPhotoSrc}
					onSelect={handleThumbnailClick}
					label={t("productImage")}
				/>
			)}
		</div>
	);
}
