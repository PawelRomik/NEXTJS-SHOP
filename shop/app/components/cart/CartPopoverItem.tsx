"use client";
import CartPopoverItemButtons from "./CartPopoverItemButtons";
import CartPopoverItemDetails from "./CartPopoverItemDetails";

type CartPopoverItemProps = {
	item: {
		uuid: string;
		image: string;
		name: string;
		price: number;
		quantity: number;
		onSale: boolean;
	};
};

export default function CartPopoverItem({ item }: CartPopoverItemProps) {
	return (
		<div
			className="item mb-7 flex w-full items-center justify-between gap-5 bg-[rgb(12,12,12)] px-5"
			key={item.uuid}
		>
			<CartPopoverItemDetails item={item} />
			<CartPopoverItemButtons id={item.uuid} />
		</div>
	);
}
