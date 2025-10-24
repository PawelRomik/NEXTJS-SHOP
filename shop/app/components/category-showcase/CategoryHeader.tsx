export default function CategoryHeader({ name }: { name: string }) {
	return (
		<div className="flex w-full flex-col">
			<h1 className="py-3 text-4xl font-bold">{name}</h1>
			<div className="w-full border-[5px] border-transparent border-t-red-600" />
			<div className="w-[90%] border-[3px] border-transparent border-t-red-700" />
		</div>
	);
}
