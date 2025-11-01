import { getTranslations } from "next-intl/server";
import OrderSuccessContent from "../../../components/order-status/OrderSuccessContent";
import OrderErrorContent from "../../../components/order-status/OrderErrorContent";
import { getOrderData } from "../../../lib/hooks/getOrderData";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "order" });

	return {
		title: `${t("status")} | Ephonix`
	};
}

export default async function OrderStatusPage({
	searchParams,
	params: { locale }
}: {
	searchParams: { state: string; session_id: string };
	params: { locale: string };
}) {
	const state = searchParams.state ? searchParams.state : "error";
	const session_id = searchParams.session_id ? searchParams.session_id : "";
	const order = await getOrderData(session_id);
	return (
		<div className="flex h-full flex-1 flex-col items-center justify-center bg-[rgb(12,12,12)]">
			{state === "success" ? (
				<OrderSuccessContent order={order} locale={locale} />
			) : (
				<OrderErrorContent />
			)}
		</div>
	);
}
