"use client";

import { useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CartPopoverItem from "./CartPopoverItem";
import CartPopoverSummary from "./CartPopoverSummary";
import CartPopoverTrigger from "./CartPopoverTrigger";
import { useCartProducts } from "../../lib/hooks/useCartProducts";

type RootState = {
	cart: {
		products: any[];
		count: number;
	};
};

export type product = {
	id: string;
	uuid: string;
	name: string;
	desc: string;
	price: number;
	salePrice: number;
	onSale: boolean;
	image: string;
	quantity: number;
};

export default function CartPopover() {
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState(false);
	const productsIds = useSelector((state: RootState) => state.cart.products);
	const count = useSelector((state: RootState) => state.cart.count);
	const pathname = usePathname();
	const locale = useLocale();
	const products = useCartProducts(productsIds, locale);
	const prevTotalQuantity = useRef(products.reduce((sum, item) => sum + item.quantity, 0));

	useEffect(() => {
		const currentTotalQuantity = productsIds.reduce((sum, item) => sum + item.quantity, 0);
		if (currentTotalQuantity > prevTotalQuantity.current && !pathname.endsWith("/cart")) {
			setIsOpen(true);
		}
		prevTotalQuantity.current = currentTotalQuantity;
	}, [productsIds, pathname]);

	return (
		<Popover.Root open={isOpen} defaultOpen={false} onOpenChange={(open) => setIsOpen(open)}>
			<CartPopoverTrigger count={count} />
			<Popover.Portal>
				<Popover.Content
					onInteractOutside={(event) => {
						if ((event.target as HTMLElement).closest(".ignore-popover-close")) {
							event.preventDefault();
						}
					}}
					className=" hidden w-[100vw]  origin-top animate-showNav border-[3px] border-red-600 bg-[rgb(20,20,20)] lg:flex  lg:w-auto  "
				>
					<div className="uppercase text-white">
						<h1 className="mb-7 bg-[rgb(12,12,12)] p-3 text-center text-2xl font-bold lg:px-10">
							{t("cart.content")}
						</h1>
						<div className=" px-5">
							{products?.slice(0, 3).map((item) => <CartPopoverItem key={item.uuid} item={item} />)}
							{products.length > 0 ? (
								<CartPopoverSummary products={products} />
							) : (
								<p className="w-full pb-5 text-center font-bold">{t("cart.noProducts")}</p>
							)}
						</div>
					</div>
					<Popover.Close
						className="absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full text-red-600 outline-none hover:text-red-400 "
						aria-label="Close"
					>
						<i className="ri-close-circle-line"></i>
					</Popover.Close>
					<Popover.Arrow width={20} height={10} className="fill-red-600" />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
