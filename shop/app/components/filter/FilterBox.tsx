import Filter from "./Filter";

type FilterProps = {
	filter: {
		id: string;
		attributes: {
			name: string;
			tags: {
				data: {
					attributes: {
						name: string;
					};
				}[];
			};
		};
	};
};

export default function FilterBox({ filter }: FilterProps) {
	const name = filter.attributes.name;
	const tags = filter.attributes.tags.data;
	return (
		<div className="flex w-[300px] flex-col rounded-2xl bg-[rgb(24,24,24)]   px-10  py-2 lg:w-full">
			<h2 className="mb-2 w-full border-b-4 border-zinc-800 p-2 font-bold  uppercase">{name}</h2>
			<div className="text-zinc-400">
				{tags.map((tag) => (
					<Filter key={tag.attributes.name} name={name} tag={tag.attributes.name} />
				))}
			</div>
		</div>
	);
}
