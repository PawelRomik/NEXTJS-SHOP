import Image from "next/image";
import {
	Carousel,
	CarouselItem,
	CarouselContent,
	CarouselPrevious,
	CarouselNext
} from "@/components/ui/carousel";

type ProductThumbnailsProps = {
	images: any[];
	activeSrc: string;
	onSelect: (url: string) => void;
	label: string;
};

export default function ProductThumbnails({
	images,
	activeSrc,
	onSelect,
	label
}: ProductThumbnailsProps) {
	return (
		<Carousel className="w-[60%] pb-5 lg:w-[30%]">
			<CarouselContent className={`${images.length === 2 ? "justify-center" : ""}`}>
				{images.map((image, index) => {
					const url = image.attributes.url;
					return (
						<CarouselItem key={index} className="basis-1/3 cursor-pointer">
							<Image
								width={600}
								height={600}
								src={`${process.env.NEXT_PUBLIC_STRAPI_PATH}${url}`}
								alt={`${label} ${index + 1}`}
								className={`h-[100%] border-2 object-cover p-2 transition hover:p-1 lg:p-4 hover:lg:p-3 ${
									activeSrc === url ? "border-red-500" : "border-zinc-800"
								}`}
								onClick={() => onSelect(url)}
							/>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			{images.length > 3 && (
				<>
					<CarouselPrevious className="border-red-600 bg-red-600 text-white hover:border-red-500 hover:bg-red-500 hover:text-white" />
					<CarouselNext className="border-red-600 bg-red-600 text-white hover:border-red-500 hover:bg-red-500 hover:text-white" />
				</>
			)}
		</Carousel>
	);
}
