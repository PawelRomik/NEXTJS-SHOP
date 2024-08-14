import { Inter } from "next/font/google";
import Footer from "../../../components/Footer";
import InformationHeader from "../../../components/InformationHeader";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import initTranslations from "../../../i18n";
import TranslationsProvider from "../../../components/TranslationProvider";

const inter = Inter({
	subsets: ["latin"],
	display: "swap"
});

type informationLayoutProps = {
	children: React.ReactNode;
	params: { locale: string };
};

export default async function InformationLayout({ children, params }: informationLayoutProps) {
	const { locale } = params;
	const { resources } = await initTranslations(locale, ["common", "information"]);
	return (
		<TranslationsProvider
			namespaces={["common", "information"]}
			locale={locale}
			resources={resources}
		>
			<div className={`${inter.className} flex min-h-screen flex-col bg-zinc-950 text-white`}>
				<InformationHeader locale={locale} />
				<div className="flex flex-1 items-stretch pl-6">
					{children}
					<ScrollToTopButton />
				</div>
				<Footer locale={locale} />
			</div>
		</TranslationsProvider>
	);
}
