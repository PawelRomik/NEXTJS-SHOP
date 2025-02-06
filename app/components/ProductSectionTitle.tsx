import { useTranslations } from "next-intl";

function ProductSectionTitle({ title }: { title: string }) {
	return (
		<div className="flex h-[120px] items-center justify-center bg-[rgb(11,11,11)] text-4xl font-bold uppercase text-white">
			<h2 className=" flex items-center gap-1   text-3xl font-bold uppercase text-white">
				<span className="ml-2 block h-[20px] w-[5px] skew-x-[-25deg] bg-white"></span>
				<span className="mr-2 block h-[20px] w-[5px] skew-x-[-25deg] bg-white"></span>
				{title}
			</h2>
		</div>
	);
}

export default ProductSectionTitle;
