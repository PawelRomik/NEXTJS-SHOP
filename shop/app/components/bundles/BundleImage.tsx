import Image from "next/image";

type BundleImageProps = {
	display: string;
	name: string;
};

export default function BundleImage({ display, name }: BundleImageProps) {
	return (
		<div className="relative w-full bg-[rgb(12,12,12)]    ">
			<Image
				src={`${process.env.NEXT_PUBLIC_STRAPI_PATH}${display}`}
				alt={name}
				width={600}
				height={600}
				className="h-[300px]  object-contain p-6  transition group-hover:scale-105"
			/>
		</div>
	);
}
