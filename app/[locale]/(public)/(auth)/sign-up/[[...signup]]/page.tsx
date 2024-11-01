import { SignUp } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "sign" });

	return {
		title: `${t("signUp")} | Ephonix`
	};
}

export default function SignUpPage() {
	return <SignUp />;
}
