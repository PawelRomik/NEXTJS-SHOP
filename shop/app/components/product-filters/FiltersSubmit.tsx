type FiltersSubmitProps = {
	label: string;
};

export default function FiltersSubmit({ label }: FiltersSubmitProps) {
	return (
		<button
			type="submit"
			className="mx-5 mb-3 h-full rounded-[10px] bg-[rgb(28,28,28)] p-[3px] px-5 font-bold uppercase text-white hover:bg-red-600"
		>
			{label}
		</button>
	);
}
