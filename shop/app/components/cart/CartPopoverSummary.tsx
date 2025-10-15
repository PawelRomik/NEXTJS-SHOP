import { useTranslations } from "next-intl";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cardReducer";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCurrency } from "../../lib/context/CurrencyProvider";
import { Product } from "../../lib/hooks/useCartProducts";

type CartPopoverSummaryProps = {
	products: Product[];
};

export default function CartPopoverSummary({ products }: CartPopoverSummaryProps) {
	const dispatch = useDispatch();
	const t = useTranslations();
	const { exchangeRate } = useCurrency();

	const totalPrice = () => {
		const total = products.reduce((acc, item) => {
			return acc + item.quantity * parseFloat(formatPrice(item.price, exchangeRate));
		}, 0);
		return total.toFixed(2);
	};

	return (
		<>
			<div className="total mb-5 flex justify-end gap-3   text-lg font-medium uppercase">
				{products.length > 3 && (
					<p className="mr-auto flex items-center justify-end gap-1 bg-[rgb(12,12,12)] p-2 px-4 py-2 text-sm font-bold text-white">
						<span>{products.length - 1}+</span>
						<span>{t("cart.more")}</span>
					</p>
				)}
				<div className="flex items-center justify-center gap-3 bg-[rgb(12,12,12)] px-4 py-2">
					<span>{t("cart.subtotal")}</span>
					<span className="text-red-600">{t("product.price", { amount: totalPrice() })}</span>
				</div>
			</div>
			<Link href="/cart">
				<button className="mx-auto mb-5 flex w-full cursor-pointer items-center justify-center gap-5 border-none bg-red-600 p-3 font-bold uppercase text-white transition hover:bg-red-500">
					{t("cart.checkout")}
				</button>
			</Link>
			<div className="my-3 flex items-center justify-end gap-3">
				<p
					className=" cursor-pointer bg-[rgb(12,12,12)] px-4 py-3 text-xs font-bold transition hover:bg-red-600"
					onClick={() => dispatch(resetCart())}
				>
					{t("cart.resetBtn")}
				</p>
			</div>
		</>
	);
}
