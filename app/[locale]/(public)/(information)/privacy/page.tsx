import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import initTranslations from "../../../../i18n";
import TranslationsProvider from "../../../../components/TranslationProvider";

type PrivacyProps = {
	params: {
		locale: string;
	};
};

export const metadata: Metadata = {
	title: "Privacy Policy | Ephonix"
};

export default async function PrivacyPage({ params: { locale } }: PrivacyProps) {
	const { t, resources } = await initTranslations(locale, ["common", "information"]);
	revalidatePath("/[locale]/privacy", "page");

	return (
		<TranslationsProvider
			namespaces={["common", "information"]}
			locale={locale}
			resources={resources}
		>
			<main className="mx-auto flex flex-1 flex-col justify-start gap-6 p-6">
				<div className="flex text-4xl font-bold text-red-600">
					<i className="ri-arrow-right-double-fill"></i>
					<h1>{t("information:privacy")}</h1>
				</div>
				<ul>
					<li>
						<h2 className="p-3 font-bold">1. General Information</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
					<li>
						<h2 className="p-3 font-bold">2. Personal Data Administrator</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
					<li>
						<h2 className="p-3 font-bold">3. Personal Data</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
					<li>
						<h2 className="p-3 font-bold">4. Basis for Data Processing</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
					<li>
						<h2 className="p-3 font-bold">5. Data Recipients</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
					<li>
						<h2 className="p-3 font-bold">6. User Rights</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
					<li>
						<h2 className="p-3 font-bold">7. Data Security</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
					<li>
						<h2 className="p-3 font-bold">8. Data Retention Period</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
					<li>
						<h2 className="p-3 font-bold">9. Changes to the Privacy Policy</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
					<li>
						<h2 className="p-3 font-bold">10. Contact</h2>
						<p className="pl-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</li>
				</ul>
				<hr></hr>
				<p>
					<strong>Last Update:</strong> 14.08.2024
				</p>
				<hr></hr>
			</main>
		</TranslationsProvider>
	);
}
