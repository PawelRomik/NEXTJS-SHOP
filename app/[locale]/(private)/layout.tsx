import Footer from "../../components/Footer";
import ShopHeader from "../../components/ShopHeader";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import initTranslations from "../../i18n";
import TranslationsProvider from "../../components/TranslationProvider";

type PrivateLayoutProps = {
	children: React.ReactNode;
	params: { locale: string };
};

export default async function PrivateLayout({ children, params }: PrivateLayoutProps) {
	const { locale } = params;
	const { resources } = await initTranslations(locale, ["common", "shop"]);

	return (
		<TranslationsProvider
			namespaces={["common", "information"]}
			locale={locale}
			resources={resources}
		>
			<div className={`roboto flex min-h-screen flex-col`}>
				<ShopHeader locale={locale} />
				{children}
				<ScrollToTopButton />
				<Footer locale={locale} />
			</div>
		</TranslationsProvider>
	);
}
