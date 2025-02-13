import { useTranslations } from "next-intl";

function ProductSectionTitle({ title }: { title: string }) {
	return (
		<div className=" relative flex h-[120px] items-center justify-center overflow-hidden bg-[rgb(11,11,11)] text-4xl font-bold uppercase text-white">
			<div className="absolute left-[5%] flex h-[200%] w-[200px] rotate-[20deg] items-center justify-center">
				<div className="h-full w-full bg-white"></div>
				<div className="h-full w-full"></div>
				<div className="h-full w-full bg-red-500"></div>
				<div className="h-full w-full"></div>
				<div className="h-full w-full bg-red-600"></div>
			</div>
			<h2 className="flex items-center gap-1 text-3xl font-bold uppercase text-white">{title}</h2>
		</div>
	);
}

export default ProductSectionTitle;
