import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import OrderInformations from "../../../../../components/OrderInformations";
import OrderProducts from "../../../../../components/OrderProducts";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ProductSectionTitle from "../../../../../components/ProductSectionTitle";

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

export default function OrderInfoPage({ params: { id } }: { params: { id: string } }) {
	revalidatePath("/[locale]/user/order/[id]", "page");
	const t = useTranslations();

	return (
		<main className=" flex w-full flex-1 flex-col bg-[rgb(20,20,20)]">
			<ProductSectionTitle title={`${t("order.order")} #${id} `} />
			<div className="shadow-inset flex h-full w-full flex-1 flex-col gap-10 bg-[rgb(20,20,20)] px-[5%] pt-[5%]">
				<OrderInformations id={id} />
				<OrderProducts id={id} />
				<p className="mt-auto flex w-full items-center justify-end gap-3  text-right text-white">
					{t("support.gotProblem")}
					<Link href="/support" className="text-red-600 hover:text-red-700">
						{t("support.contact")}!
					</Link>
				</p>
			</div>
		</main>
	);
}
