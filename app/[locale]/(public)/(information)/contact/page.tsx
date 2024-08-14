import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import initTranslations from "../../../../i18n";
import TranslationsProvider from "../../../../components/TranslationProvider";

type ContactProps = {
	params: {
		locale: string;
	};
};

export const metadata: Metadata = {
	title: "Contact | Ephonix"
};

export default async function ContactPage({ params: { locale } }: ContactProps) {
	const { t, resources } = await initTranslations(locale, ["common", "information"]);
	revalidatePath("/[locale]/contact", "page");

	return (
		<TranslationsProvider
			namespaces={["common", "information"]}
			locale={locale}
			resources={resources}
		>
			<main className="mx-auto flex flex-1 flex-col justify-start gap-6 p-6">
				<div className="flex text-4xl font-bold text-red-600">
					<i className="ri-arrow-right-double-fill"></i>
					<h1>{t("information:contact")}</h1>
				</div>
				<p>
					<i className="ri-phone-fill"></i> 123 456 789
				</p>
				<p>
					<i className="ri-mail-fill"></i> N3xt@gmail.com
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
					viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
					ipsum.
				</p>
			</main>
		</TranslationsProvider>
	);
}
