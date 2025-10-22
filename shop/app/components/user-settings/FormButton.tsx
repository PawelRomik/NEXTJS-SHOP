"use client";
import React from "react";

type FormButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	label: string;
};

export function FormButton({ label, className = "", ...props }: FormButtonProps) {
	return (
		<button
			{...props}
			className={`rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-500 disabled:opacity-50 ${className}`}
			disabled={props.disabled}
		>
			{label}
		</button>
	);
}
