import { SignIn } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "sign" });

	return {
		title: `${t("signIn")} | Ephonix`
	};
}

export default function SignInPage() {
	return <SignIn />;
}
