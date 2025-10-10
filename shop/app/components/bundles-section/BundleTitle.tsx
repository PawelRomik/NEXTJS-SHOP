export default function BundleTitle({ name }: { name: string }) {
	return (
		<div className="flex w-full  flex-col bg-red-600 py-4 pl-6 text-2xl font-bold uppercase text-white">
			<h2>{name}</h2>
		</div>
	);
}
