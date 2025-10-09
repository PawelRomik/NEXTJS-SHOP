import Image from "next/image";
import nextLogo from "../../../../public/logolg.png";
import { ReactNode } from "react";

type StepContainerProps = {
	title: string;
	children: ReactNode;
};

export default function StepContainer({ title, children }: StepContainerProps) {
	return (
		<div className="w-full space-y-6 rounded-2xl border-4 border-red-600 bg-zinc-950 px-8 py-10 shadow-md ring-1 ring-black/5 sm:w-96">
			<header className="flex flex-col items-center justify-center text-center">
				<Image src={nextLogo} alt="Logo" className="w-24" />
				<h1 className="mt-4 text-3xl font-bold uppercase tracking-tight text-white">{title}</h1>
			</header>
			{children}
		</div>
	);
}
