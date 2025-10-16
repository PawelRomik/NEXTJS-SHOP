import Image from "next/image";
import nextLogo from "../../../public/logo.png";

type SubCategoryImageProps = {
	src?: string;
	alt: string;
};

export function SubCategoryImage({ src, alt }: SubCategoryImageProps) {
	return (
		<div className="my-auto h-[250px] w-[300px]">
			<Image
				height={250}
				width={300}
				className={` h-full w-full object-contain  p-5 `}
				src={src || nextLogo}
				alt={alt}
			/>
		</div>
	);
}
