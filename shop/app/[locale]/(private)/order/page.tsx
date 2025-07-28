import { revalidatePath } from "next/cache";
import Link from "next/link";
import ProductDisplay from "../../../components/ProductDisplay";
import createApolloClient from "../../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../../../queries/productType";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../components/SkeletonProductDisplay";
import { useTranslations } from "next-intl";
import { GET_OTHER_PRODUCTS } from "../../../queries/productPage";
import { getTranslations } from "next-intl/server";
import ResetCartHandler from "../../../components/ResetCartHandler";
import OrderSuccessContent from "../../../components/OrderSuccessContent";
import OrderErrorContent from "../../../components/OrderErrorContent";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "order" });

	return {
		title: `${t("status")} | Ephonix`
	};
}

export default function OrderStatusPage({
	searchParams,
	params: { locale }
}: {
	searchParams: { state: string };
	params: { locale: string };
}) {
	revalidatePath("/[locale]/order/[state]", "page");
	const t = useTranslations("order");
	const state = searchParams.state ? searchParams.state : "error";

	return (
		<div className="flex h-full flex-1 flex-col items-center justify-center bg-[rgb(12,12,12)]">
			{state === "success" ? <OrderSuccessContent locale={locale} /> : <OrderErrorContent />}
		</div>
	);
}
