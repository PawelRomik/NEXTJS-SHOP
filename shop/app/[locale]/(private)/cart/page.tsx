import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import CartContent from "../../../components/cart-page/CartContent";

type CategoryKeys = keyof IntlMessages["categories"];

export async function generateMetadata({
	params: { locale }
}: {
	params: { category: CategoryKeys; locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "cart" });

	return {
		title: `${t("cart")} | Ephonix`
	};
}

export default async function CartPage() {
	revalidatePath("/[locale]/cart", "page");

	return (
		<main className=" w-full flex-1  bg-[rgb(20,20,20)]">
			<CartContent />
		</main>
	);
}
