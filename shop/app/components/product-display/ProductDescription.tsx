"use client";
type ProductDescriptionProps = {
	desc: string;
	name: string;
};

export const ProductDescription = ({ desc, name }: ProductDescriptionProps) => {
	const extractText = (text: string) => {
		const startIndex = text.indexOf("--START--") + "--START--".length;
		const endIndex = text.indexOf(".");
		return text.slice(startIndex, endIndex).trim() + ".";
	};

	return (
		<>
			<div className="flex  w-full flex-col pl-6 pt-4 text-2xl font-bold text-white">
				<h2>{name}</h2>
			</div>
			<div className="flex flex-1 pl-6 pr-2 pt-4 text-white">{extractText(desc)}</div>
		</>
	);
};
