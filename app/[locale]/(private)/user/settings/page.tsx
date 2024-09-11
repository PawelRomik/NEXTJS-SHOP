import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	//const t = await getTranslations({ locale, namespace: "settings" });

	return {
		title: `Settings | Ephonix`
	};
}

export default function ProductPage({
	params: { locale, productId }
}: {
	params: { productId: string; locale: string };
}) {
	revalidatePath("/[locale]/user/settings", "page");

	return (
		<main className=" flex w-full flex-1 flex-col gap-3 bg-zinc-950 p-5">
			<h1 className="text-3xl font-bold uppercase text-white">Settings</h1>
		</main>
	);
}
