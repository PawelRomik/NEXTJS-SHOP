import * as Clerk from "@clerk/elements/common";

type AuthFieldProps = {
	name: string;
	label: string;
	placeholder: string;
	type?: string;
	getErrorMessage: (message: string) => string;
};

export default function AuthField({
	name,
	label,
	placeholder,
	type = "text",
	getErrorMessage
}: AuthFieldProps) {
	return (
		<Clerk.Field name={name} className="space-y-2">
			<Clerk.Label htmlFor={name} className="text-sm font-medium uppercase text-white">
				{label}
			</Clerk.Label>
			<Clerk.Input
				id={name}
				name={name}
				type={type}
				required
				className="w-full rounded bg-white px-3.5 py-2 text-sm text-black outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-white data-[invalid]:ring-red-500"
				placeholder={placeholder}
				autoComplete={type === "password" ? "current-password" : "username"}
				aria-invalid="false"
				aria-describedby={`${name}-error`}
			/>
			<Clerk.FieldState>
				{({ message = "Field is empty.", state }) =>
					state === "error" && (
						<span id={`${name}-error`} className="block text-sm text-red-500">
							{getErrorMessage(message)}
						</span>
					)
				}
			</Clerk.FieldState>
		</Clerk.Field>
	);
}
