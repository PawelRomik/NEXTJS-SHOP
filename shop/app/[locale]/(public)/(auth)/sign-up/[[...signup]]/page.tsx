import { getTranslations } from "next-intl/server";
import SignUpForm from "../../../../../components/SignUpForm";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "sign" });

	return {
		title: `${t("signUp")} | Ephonix`
	};
}

export default function SignUpPage() {
	return (
		<main className=" flex h-full w-full flex-1 flex-col items-center justify-center bg-[rgb(20,20,20)]">
			<SignUpForm />
		</main>
	);
}
