type SupportFormFieldProps = {
	label: string;
	name: string;
	type?: string;
	value: string;
	error?: string;
	as?: "input" | "textarea";
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export function SupportFormField({
	label,
	name,
	type = "text",
	value,
	error,
	as = "input",
	onChange
}: SupportFormFieldProps) {
	const Field = as === "textarea" ? "textarea" : "input";

	return (
		<div className="mb-4 flex flex-col items-center justify-center gap-3 px-3 md:px-0 lg:flex-row">
			<label className="block w-full text-center text-xl font-bold uppercase lg:w-[10rem] lg:text-right">
				{label}
			</label>
			<Field
				name={name}
				value={value}
				onChange={onChange}
				required
				type={as === "textarea" ? undefined : type}
				className="w-full flex-1 rounded-lg bg-white p-3 text-black lg:w-auto "
			/>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}
