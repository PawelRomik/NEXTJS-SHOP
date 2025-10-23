type FiltersTitleProps = {
	title: string;
};

export default function FiltersTitle({ title }: FiltersTitleProps) {
	return (
		<h2 className="flex w-[40%] items-center gap-1 px-5 py-3 text-xl font-bold uppercase text-white">
			<span className="block h-[20px] w-[5px] skew-x-[-25deg] bg-white"></span>
			<span className="mr-2 block h-[20px] w-[5px] skew-x-[-25deg] bg-white"></span>
			{title}
		</h2>
	);
}
