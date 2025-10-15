"use client";

type FilterProps = {
	name: string;
	tag: string;
};

export default function Filter({ name, tag }: FilterProps) {
	const id = `${name}-${tag}`;
	return (
		<div className="flex items-center justify-start gap-2 text-white">
			<input id={id} type="checkbox" name="tags" value={tag} />
			<label htmlFor={id}>{tag}</label>
		</div>
	);
}
