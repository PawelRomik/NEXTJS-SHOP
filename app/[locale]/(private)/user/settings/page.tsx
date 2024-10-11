import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "categories" });

	return {
		title: `${t("settings")} | Ephonix`
	};
}

export default function ProductPage({
	params: { locale, productId }
}: {
	params: { productId: string; locale: string };
}) {
	revalidatePath("/[locale]/user/settings", "page");
	const t = useTranslations("categories");

	return (
		<main className=" flex w-full flex-1 flex-col gap-3 bg-zinc-950 p-5">
			<h1 className="text-3xl font-bold uppercase text-white">{t("settings")}</h1>
		</main>
	);
}
