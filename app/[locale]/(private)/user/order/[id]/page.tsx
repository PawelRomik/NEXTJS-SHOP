import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "order" });

	return {
		title: `${t("order")} | Ephonix`
	};
}

export default function OrderPage({
	params: { locale, orderId }
}: {
	params: { orderId: string; locale: string };
}) {
	revalidatePath("/[locale]/user/order", "page");

	return <main className=" flex w-full flex-1 flex-col gap-3 bg-zinc-950 p-5"></main>;
}
