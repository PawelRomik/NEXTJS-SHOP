import Footer from "../../../components/footer/Footer";
import ShopHeader from "../../../components/header/ShopHeader";
import ScrollToTopButton from "../../../components/common/ScrollToTopButton";
type shopLayoutProps = {
	children: React.ReactNode;
};

export default async function CartLayout({ children }: shopLayoutProps) {
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
