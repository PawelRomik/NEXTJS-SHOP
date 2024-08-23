import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
	params: { locale }
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "information" });

	return {
		title: `${t("privacy")} | Ephonix`
	};
}
export default function PrivacyPage() {
	const t = useTranslations("information");
	revalidatePath("/[locale]/privacy", "page");

	return (
		<main className="mx-auto flex flex-1 flex-col justify-start gap-6 p-6">
			<div className="flex text-4xl font-bold text-red-600">
				<i className="ri-arrow-right-double-fill"></i>
				<h1>{t("privacy")}</h1>
			</div>
			<ul>
				<li>
					<h2 className="p-3 font-bold">1. {t("generalInformation")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">2. {t("personalDataAdministrator")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">3. {t("personalData")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">4. {t("basisForDataProcessing")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">5. {t("dataRecipients")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">6. {t("userRights")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">7. {t("dataSecurity")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">8. {t("dataRetentionPeriod")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">9. {t("changesToPrivacyPolicy")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">10. {t("contact")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
			</ul>
			<hr></hr>
			<p>
				<strong>{t("lastUpdate")}:</strong> 23.08.2024
			</p>
			<hr></hr>
		</main>
	);
}
