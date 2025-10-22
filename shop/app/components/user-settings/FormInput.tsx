"use client";
import React from "react";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	id: string;
};

export function FormInput({ label, id, ...props }: FormInputProps) {
	return (
		<div className="flex items-center justify-between gap-5">
			{label && <label htmlFor={id}>{label}</label>}
			<input id={id} {...props} className={`rounded p-2 text-black ${props.className || ""}`} />
		</div>
	);
}
