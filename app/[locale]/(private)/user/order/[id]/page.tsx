import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import OrderInformations from "../../../../../components/OrderInformations";
import OrderProducts from "../../../../../components/OrderProducts";
import Link from "next/link";
import { useTranslations } from "next-intl";

export async function generateMetadata({
	params: { locale, id }
}: {
	params: { locale: string; id: string };
}) {
	const t = await getTranslations({ locale, namespace: "order" });

	return {
		title: `${t("order")} #${id} | Ephonix`
	};
}

export default function OrderPage({
	params: { locale, id }
}: {
	params: { id: string; locale: string };
}) {
	revalidatePath("/[locale]/user/order/[id]", "page");
	const t = useTranslations();

	return (
		<main className=" flex w-full flex-1 flex-col gap-3 bg-zinc-950 p-5">
			<Link href={"/user/orders"} className="text-red-600 hover:text-red-700">
				{t("common.back")}
			</Link>
			<h1 className="text-3xl font-bold text-white">
				{t("order.order")} #{id}
			</h1>
			<div className="flex h-full flex-1 flex-col gap-10">
				<OrderInformations id={id} />
				<OrderProducts id={id} />
			</div>
			<p className="flex gap-3 text-white">
				{t("support.gotProblem")}
				<Link href="/support" className="text-red-600 hover:text-red-700">
					{t("support.contact")}!
				</Link>
			</p>
		</main>
	);
}
