import { revalidatePath } from "next/cache";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	//const t = await getTranslations({ locale, namespace: "settings" });

	return {
		title: `Order | Ephonix`
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
