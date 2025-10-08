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

export default function Filter({ filter }: FilterProps) {
	return (
		<div className="flex w-[300px] flex-col rounded-2xl bg-[rgb(24,24,24)]   px-10  py-2 lg:w-full">
			<h2 className="mb-2 w-full border-b-4 border-zinc-800 p-2 font-bold  uppercase">
				{filter.attributes.name}
			</h2>
			<div className="text-zinc-400">
				{filter.attributes.tags.data.map((tag, index) => (
					<div key={index} className="flex items-center justify-start gap-2 text-white">
						<input type="checkbox" name={"tags"} value={tag.attributes.name} />
						{tag.attributes.name}
					</div>
				))}
			</div>
		</div>
	);
}
