import Footer from "../../../components/Footer";
import ShopHeader from "../../../components/ShopHeader";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import TranslationsProvider from "../../../components/TranslationProvider";
import initTranslations from "../../../i18n";

type shopLayoutProps = {
	children: React.ReactNode;
	params: { locale: string };
};

export default async function ShopLayout({ children, params }: shopLayoutProps) {
	const { locale } = params;
	const { resources } = await initTranslations(locale, ["common", "shop"]);

	return (
		<TranslationsProvider namespaces={["common", "shop"]} locale={locale} resources={resources}>
			<div className={` roboto flex min-h-screen flex-col`}>
				<ShopHeader locale={locale} />
				<div className="flex flex-1 items-stretch">
					{children}
					<ScrollToTopButton />
				</div>
				<Footer locale={locale} />
			</div>
		</TranslationsProvider>
	);
}
