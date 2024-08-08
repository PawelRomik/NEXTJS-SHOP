import Footer from "../../../components/Footer";
import ShopHeader from "../../../components/ShopHeader";
import ScrollToTopButton from "../../../components/ScrollToTopButton";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={` roboto flex min-h-screen flex-col`}>
			<ShopHeader />
			<div className="flex flex-1 items-stretch">
				{children}
				<ScrollToTopButton />
			</div>
			<Footer />
		</div>
	);
}
