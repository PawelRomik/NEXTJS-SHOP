import { getTranslations } from "next-intl/server";
import SignInForm from "../../../../../components/SignInForm";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "sign" });

	return {
		title: `${t("signIn")} | Ephonix`
	};
}

export default function SignInPage() {
	return (
		<main className=" flex h-full w-full flex-1 flex-col items-center justify-center bg-[rgb(20,20,20)]">
			<SignInForm />
		</main>
	);
}
