"use client";

import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";

export default function CartPopover() {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<div className="flex items-center justify-center lg:ml-2">
					<button
						className="inline-flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white outline-none"
						aria-label="Update dimensions"
					>
						<i className="ri-shopping-cart-2-line text-2xl"></i>
					</button>
					<p className="font-bold">2</p>
				</div>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]"
					sideOffset={5}
				>
					<div className="flex flex-col gap-2.5">
						<p className="text-mauve12 mb-2.5 gap-6 text-2xl font-medium leading-[19px]">
							<i className="ri-shopping-cart-2-line mr-2"></i>Cart
						</p>
						<div className="mb-5 flex items-center justify-between">
							<p>Items: 2</p>
							<p>Price: 200zł</p>
						</div>

						<Link
							href="/checkout"
							className="flex items-center justify-center rounded-full bg-black py-2 text-white"
						>
							Checkout
						</Link>
					</div>
					<Popover.Close
						className="text-violet11 absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full outline-none "
						aria-label="Close"
					>
						X
					</Popover.Close>
					<Popover.Arrow className="fill-white" />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
