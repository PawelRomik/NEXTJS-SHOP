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
		<div className="flex w-full flex-[49%] flex-col  px-10 py-2">
			<h2 className="mb-2 w-full border-b-2  text-center">{filter.attributes.name}</h2>
			<div className="text-zinc-400">
				{filter.attributes.tags.data.map((tag, index) => (
					<div key={index} className="flex items-center justify-start gap-2">
						<input type="checkbox" name={"tags"} value={tag.attributes.name} />
						{tag.attributes.name}
					</div>
				))}
			</div>
		</div>
	);
}
