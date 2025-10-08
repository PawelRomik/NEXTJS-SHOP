import { Inter } from "next/font/google";
import Footer from "../../../components/footer/Footer";
import ScrollToTopButton from "../../../components/common/ScrollToTopButton";
import ShopHeader from "../../../components/header/ShopHeader";

const inter = Inter({
	subsets: ["latin"],
	display: "swap"
});

type informationLayoutProps = {
	children: React.ReactNode;
};

export default async function InformationLayout({ children }: informationLayoutProps) {
	return (
		<div className={` roboto flex min-h-screen flex-col bg-[rgb(8,8,8)] text-white`}>
			<ShopHeader />
			<div className="flex flex-1 items-stretch">
				{children}
				<ScrollToTopButton />
			</div>
			<Footer />
		</div>
	);
}
