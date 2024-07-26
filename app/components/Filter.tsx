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

export default function FilterComponent({ filter }: FilterProps) {
	return (
		<div className="flex w-full flex-[49%] flex-col bg-black px-10 py-2">
			<h2 className="mb-2 w-full border-b-2 border-zinc-800 text-center">
				{filter.attributes.name}
			</h2>
			<div className="text-zinc-400">
				{filter.attributes.tags.data.map((tag, index) => (
					<div key={index} className="flex items-center justify-start gap-2">
						<input
							type="radio"
							name={filter.attributes.name.toLowerCase()}
							value={tag.attributes.name}
							className="border-zinc-900 bg-zinc-800"
						/>
						{tag.attributes.name}
					</div>
				))}
			</div>
		</div>
	);
}
