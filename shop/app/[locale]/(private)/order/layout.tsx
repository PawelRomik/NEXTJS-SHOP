import Footer from "../../../components/Footer";
import ShopHeader from "../../../components/ShopHeader";
import ScrollToTopButton from "../../../components/ScrollToTopButton";

type PrivateLayoutProps = {
	children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
	return (
		<div className={`roboto flex min-h-screen flex-col bg-zinc-950`}>
			<ShopHeader />
			{children}

			<ScrollToTopButton />
			<Footer />
		</div>
	);
}
