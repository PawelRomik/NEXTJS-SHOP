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
		title: `${t("terms")} | Ephonix`
	};
}

export default function TermsPage() {
	const t = useTranslations("information");

	return (
		<main className="flex flex-1 flex-col justify-start ">
			<div className="my-3 flex bg-red-600 px-6 py-3 text-4xl font-bold uppercase">
				<h1>{t("terms")}</h1>
			</div>
			<p className="mb-2 border-l-2 border-red-600 bg-[rgb(8,8,8)] px-6 font-bold uppercase italic">
				{t("lastUpdate")} 23.04.2025
			</p>

			<ul>
				<li className="bg-[rgb(16,16,16)] p-2">
					<h2 className="p-3 font-bold">1. {t("generalProvisions")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li className="bg-[rgb(8,8,8)] p-2">
					<h2 className="p-3 font-bold">2. {t("definitions")}</h2>
					<ol className="pl-6">
						<li>{t("store")}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
						<li>{t("customer")}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
						<li>{t("goods")}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
					</ol>
				</li>
				<li className="bg-[rgb(16,16,16)] p-2">
					<h2 className="p-3 font-bold">3. {t("rulesOfUsingTheStore")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li className="bg-[rgb(8,8,8)] p-2">
					<h2 className="p-3 font-bold">4. {t("placingOrders")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li className="bg-[rgb(16,16,16)] p-2">
					<h2 className="p-3 font-bold">5. {t("payments")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li className="bg-[rgb(8,8,8)] p-2">
					<h2 className="p-3 font-bold">6. {t("delivery")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li className="bg-[rgb(16,16,16)] p-2">
					<h2 className="p-3 font-bold">7. {t("complaintsAndReturns")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li className="bg-[rgb(8,8,8)] p-2">
					<h2 className="p-3 font-bold">8. {t("personalDataProtection")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li className="bg-[rgb(16,16,16)] p-2">
					<h2 className="p-3 font-bold">9. {t("finalProvisions")}</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
			</ul>
		</main>
	);
}
