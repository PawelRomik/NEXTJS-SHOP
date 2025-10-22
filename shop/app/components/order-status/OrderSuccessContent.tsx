"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cardReducer";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logolg.png";

export default function OrderSuccessContent({ locale }: { locale: string }) {
	const t = useTranslations("order");
	const dispatch = useDispatch();

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
								{t("success")}
							</span>
						</div>
					</h2>

					<div className="w-full bg-[rgb(16,16,16)] p-3">
						<p className="text-2xl lg:text-3xl">{t("orderSuccess")}</p>
						<p className=" text-sm text-gray-400 lg:text-lg">{t("estimatedDelivery")}</p>
					</div>

					<div className="flex w-full justify-between gap-2">
						<div className="flex flex-[3] flex-col items-center justify-center gap-2 bg-[rgb(27,27,27)]">
							<h3 className="text-lg">Check your order informations</h3>
							<button className="rounded-lg bg-red-600 px-6 py-3 transition hover:bg-red-500">
								{t("order")} #123
							</button>
						</div>
						<div className="flex flex-[2] flex-col items-start justify-center  text-lg">
							<p className="w-full bg-[rgb(27,27,27)] p-3">Order id: #123</p>
							<p className="w-full bg-[rgb(16,16,16)] p-3">Total price: 130zł</p>
							<p className="w-full bg-[rgb(27,27,27)] p-3">Date: 26.05.2025</p>
						</div>
					</div>
				</div>
				<div className="hidden h-full flex-[1] bg-[rgb(27,27,27)] lg:flex">
					<Image width={800} alt="logo" height={800} src={logo} />
				</div>
			</div>
			<div className="flex w-full items-center justify-center bg-[rgb(16,16,16)] p-3">
				<Link href="/" title={t("home")}>
					<button className="rounded-lg bg-red-600 px-12 py-3 text-2xl font-bold uppercase text-white transition hover:bg-red-500">
						{t("home")}
					</button>
				</Link>
			</div>
		</div>
	);
}
