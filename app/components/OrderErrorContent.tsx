"use client";
import { useTranslations } from "next-intl";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/cardReducer";
import Link from "next/link";
import SkeletonProductDisplay from "./SkeletonProductDisplay";
import ProductDisplay from "./ProductDisplay";
import { getTranslations } from "next-intl/server";
import createApolloClient from "../../apollo-client";
import { GET_OTHER_PRODUCTS } from "../queries/productPage";
import { QueryResult } from "../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import nextLogo from "../../public/logolg.png";
import Image from "next/image";

export default function OrderErrorContent() {
	const t = useTranslations();

	return (
		<div>
			<div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center text-3xl font-bold text-white ">
				<Image
					src={nextLogo}
					width={220}
					height={300}
					className="hidden w-[220px] lg:block"
					alt={t("common.shopLogo")}
				/>
				<h2 className="-rotate-3 text-4xl text-red-600">ERROR 500!</h2>
				<p className="rotate-3">{t("order.orderFail")}</p>
				<div className="flex gap-3">
					<Link href="/support" title={t("order.home")}>
						<button className="-rotate-3 rounded-lg bg-red-600 px-6 py-3 transition hover:bg-red-500">
							{t("categories.support")}
						</button>
					</Link>
					<Link href="/" title={t("order.home")}>
						<button className="rotate-3 rounded-lg bg-red-600 px-6 py-3 transition hover:bg-red-500">
							{t("order.home")}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
