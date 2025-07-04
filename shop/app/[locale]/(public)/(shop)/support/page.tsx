import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import CategoryShowcase from "../../../../components/CategoryShowcase";
import SupportForm from "../../../../components/SupportForm";
import Image from "next/image";
import nextLogo from "../../../../../public/logolg.png";
import { useTranslations } from "next-intl";

type CategoryKeys = keyof IntlMessages["categories"];

export async function generateMetadata({
	params: { locale }
}: {
	params: { category: CategoryKeys; locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "categories" });

	return {
		title: `${t("support")} | Ephonix`
	};
}

export default async function SupportPage({
	params: { locale }
}: {
	params: {
		category: CategoryKeys;
		locale: string;
	};
}) {
	revalidatePath("/[locale]/support", "page");
	const t = await getTranslations();

	return (
		<main className=" flex w-full flex-col bg-[rgb(20,20,20)]">
			<div className="mt-2 flex w-full items-center justify-center bg-red-600 py-5 text-xl md:text-4xl font-bold uppercase text-white">
				{t("support.gotProblem")}
			</div>
			<div className="shadow-inset my-auto flex h-full w-[100%] items-center justify-around gap-5 md:px-12">
				<SupportForm />
				<Image src={nextLogo} className="hidden lg:block h-[500px] w-[25%]" alt={t("common.shopLogo")} />
			</div>
		</main>
	);
}
