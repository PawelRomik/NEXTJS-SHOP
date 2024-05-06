"use client";

import { useState } from "react";

export default function SizePicker() {
	const [selectedSize, setSelectedSize] = useState(2);

	const changeSize = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const newSize = parseInt(e.currentTarget.dataset.size || "0");
		setSelectedSize(newSize);
	};

	const buttonClassName = (size: number) =>
		`w-[6rem] border-2 px-6 py-2 ${selectedSize === size ? "lg:bg-white lg:text-black font-bold bg-zinc-900 text-white" : "lg:text-white text-black"}`;

	return (
		<div className="flex flex-col gap-2">
			<h4 className="text-1xl hidden text-white lg:block">Size</h4>
			<div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
				<button onClick={changeSize} data-size={0} className={buttonClassName(0)}>
					XS
				</button>
				<button onClick={changeSize} data-size={1} className={buttonClassName(1)}>
					S
				</button>
				<button onClick={changeSize} data-size={2} className={buttonClassName(2)}>
					M
				</button>
				<button onClick={changeSize} data-size={3} className={buttonClassName(3)}>
					L
				</button>
				<button onClick={changeSize} data-size={4} className={buttonClassName(4)}>
					XL
				</button>
				<button onClick={changeSize} data-size={5} className={buttonClassName(5)}>
					2XL
				</button>
			</div>
		</div>
	);
}
