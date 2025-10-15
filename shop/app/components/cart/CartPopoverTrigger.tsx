"use client";

import * as Popover from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPopoverTrigger({ count }: { count: number }) {
	const router = useRouter();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const redirectOnMobile = () => {
		if (isMobile) router.push("/cart");
	};

	return (
		<Popover.Trigger asChild>
			<div onClick={redirectOnMobile} className="flex items-center justify-center">
				<button
					className="inline-flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full outline-none"
					aria-label="Open Cart"
				>
					<i className="ri-shopping-cart-2-line relative text-3xl">
						{count > 0 && (
							<span className="z-3 absolute left-[10px]  top-0 flex h-[15px] w-[30px] items-center justify-center rounded-full bg-red-700 py-2 font-sans text-sm font-bold text-white">
								{count < 10 ? count : "9+"}
							</span>
						)}
					</i>
				</button>
			</div>
		</Popover.Trigger>
	);
}
