"use client";
import { useDispatch } from "react-redux";
import { increaseQuantity, removeAllOfItem, removeItem } from "../../redux/cardReducer";

export default function CartPopoverItemButtons({ id }: { id: string }) {
	const dispatch = useDispatch();
	return (
		<div className="flex items-center justify-center gap-2">
			<button className="delete cursor-pointer text-2xl" onClick={() => dispatch(removeItem(id))}>
				<i className="ri-indeterminate-circle-line text-[rgb(100,100,100)]  transition hover:text-red-600"></i>
			</button>
			<button
				className="delete cursor-pointer text-2xl"
				onClick={() => dispatch(increaseQuantity(id))}
			>
				<i className="ri-add-circle-line text-[rgb(100,100,100)] transition hover:text-red-600"></i>
			</button>
			<button
				className="delete cursor-pointer text-2xl"
				onClick={() => dispatch(removeAllOfItem(id))}
			>
				<i className="ri-delete-bin-line text-[rgb(100,100,100)] transition hover:text-red-600"></i>
			</button>
		</div>
	);
}
