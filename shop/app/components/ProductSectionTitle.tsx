import { useTranslations } from "next-intl";

function ProductSectionTitle({ title }: { title: string }) {
	return (
		<div className=" relative flex h-[120px] items-center justify-center overflow-hidden bg-[rgb(11,11,11)] text-4xl font-bold uppercase text-white">
			<div className="absolute left-5 top-0 flex h-[80%] w-[40px] origin-top-right rotate-45 items-center justify-center md:h-[120%] md:w-[80px] md:rotate-0  lg:left-[5%] lg:top-auto lg:h-[200%] lg:w-[200px] lg:origin-center lg:rotate-[20deg]">
				<div className="h-full w-full bg-white"></div>
				<div className="hidden h-full w-full lg:block"></div>
				<div className="hidden h-full w-full bg-red-500 lg:block"></div>
				<div className="h-full w-full"></div>
				<div className="h-full w-full bg-red-600"></div>
			</div>
			<h2 className="flex items-center gap-1 text-3xl font-bold uppercase text-white">{title}</h2>
		</div>
	);
}

export default ProductSectionTitle;
