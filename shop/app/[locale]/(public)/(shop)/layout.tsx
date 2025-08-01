import Footer from "../../../components/Footer";
import ShopHeader from "../../../components/ShopHeader";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
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
