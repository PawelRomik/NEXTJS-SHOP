import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import ChangeEmailForm from "../../../../components/ChangeEmailForm";
import ProductSectionTitle from "../../../../components/ProductSectionTitle";
import ChangeNameForm from "../../../../components/ChangeNameForm";
import ChangeAvatarForm from "../../../../components/ChangeAvatarForm";
import ChangePasswordForm from "../../../../components/ChangePasswordForm";

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
		<main className=" flex w-full flex-1 flex-col bg-[rgb(20,20,20)]">
			<ProductSectionTitle title={t("settings")} />

			<div className="shadow-inset flex h-full flex-col gap-5 px-[5%] pt-[5%] lg:pb-[4rem]">
				<div className="w-full bg-[rgb(12,12,12)] p-3 text-white">
					<ChangeAvatarForm />
				</div>
				<div className="w-full bg-[rgb(12,12,12)] p-3 text-white">
					<ChangeNameForm />
				</div>
				<div className="w-full bg-[rgb(12,12,12)] p-3 text-white">
					<ChangeEmailForm />
				</div>
				<div className="w-full bg-[rgb(12,12,12)] p-3 text-white">
					<ChangePasswordForm />
				</div>
			</div>
		</main>
	);
}
