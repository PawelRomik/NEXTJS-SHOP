import { revalidatePath } from "next/cache";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import OrderSuccessContent from "../../../components/order-status/OrderSuccessContent";
import OrderErrorContent from "../../../components/order-status/OrderErrorContent";

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
