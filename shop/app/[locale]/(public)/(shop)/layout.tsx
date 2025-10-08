import Footer from "../../../components/footer/Footer";
import ShopHeader from "../../../components/header/ShopHeader";
import ScrollToTopButton from "../../../components/common/ScrollToTopButton";
type shopLayoutProps = {
	children: React.ReactNode;
};

export default async function ShopLayout({ children }: shopLayoutProps) {
	return (
		<div
			className={` roboto flex min-h-screen max-w-[100vw] flex-col overflow-x-hidden bg-[rgb(20,20,20)]`}
		>
			<ShopHeader />
			<div className="flex flex-1 items-stretch">
				{children}
				<ScrollToTopButton />
			</div>
			<Footer />
		</div>
	);
}
