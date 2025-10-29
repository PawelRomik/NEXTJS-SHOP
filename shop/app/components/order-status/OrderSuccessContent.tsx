"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cardReducer";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logolg.png";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCurrency } from "../../lib/context/CurrencyProvider";

type OrderSuccessContentProps = {
	locale: string;
	order: any;
};

export default function OrderSuccessContent({ locale, order }: OrderSuccessContentProps) {
	const t = useTranslations();
	const dispatch = useDispatch();
	const { exchangeRate } = useCurrency();

	const id = order.id;
	const total = formatPrice(order.attributes.total, exchangeRate);
	const date = order.attributes.date;

	useEffect(() => {
		dispatch(resetCart());
	}, [dispatch]);

	return (
		<div className="flex flex-col items-center justify-center gap-2 border-solid border-red-600 uppercase md:border-2">
			<div className="flex items-center justify-around gap-2 ">
				<div className="flex  flex-[3] flex-col items-center justify-center gap-2  text-center text-3xl font-bold text-white ">
					<h2 className="flex h-full w-full items-center justify-center bg-[rgb(27,27,27)] p-3 text-green-400 lg:text-6xl">
						<div className="flex h-[70px] w-[200px] items-center justify-center rounded-lg border-4 border-dashed border-[rgb(16,16,16)] lg:h-[100px] lg:w-[320px]">
							<span className="z-10 flex rotate-3  items-center justify-center rounded-lg bg-green-600 px-6 py-2 text-white outline-double outline-4 outline-green-700">
								{t("order.success")}
							</span>
						</div>
					</h2>

					<div className="w-full bg-[rgb(16,16,16)] p-3">
						<p className="text-2xl lg:text-3xl">{t("order.orderSuccess")}</p>
						<p className=" text-sm text-gray-400 lg:text-lg">{t("order.estimatedDelivery")}</p>
					</div>

					<div className="flex w-full justify-between gap-2">
						<div className="flex flex-[3] flex-col items-center justify-center gap-2 bg-[rgb(27,27,27)]">
							<h3 className="text-lg">{t("order.checkInfo")}</h3>
							<Link href={`/user/order/${id}`}>
								<button className="rounded-lg bg-red-600 px-6 py-3 transition hover:bg-red-500">
									{t("order.order")} #{id}
								</button>
							</Link>
						</div>
						<div className="flex flex-[2] flex-col items-start justify-center  text-lg">
							<p className="w-full bg-[rgb(27,27,27)] p-3">
								{t("order.id")}: #{id}
							</p>
							<p className="w-full bg-[rgb(16,16,16)] p-3">
								{t("order.totalPrice")}: {t("product.price", { amount: total })}
							</p>
							<p className="w-full bg-[rgb(27,27,27)] p-3">
								{t("order.date")}: {date}
							</p>
						</div>
					</div>
				</div>
				<div className="hidden h-full flex-[1] bg-[rgb(27,27,27)] lg:flex">
					<Image width={700} alt="logo" height={800} src={logo} />
				</div>
			</div>
			<div className="flex w-full items-center justify-center bg-[rgb(16,16,16)] p-3">
				<Link href="/" title={t("order.home")}>
					<button className="rounded-lg bg-red-600 px-12 py-3 text-2xl font-bold uppercase text-white transition hover:bg-red-500">
						{t("order.home")}
					</button>
				</Link>
			</div>
		</div>
	);
}
