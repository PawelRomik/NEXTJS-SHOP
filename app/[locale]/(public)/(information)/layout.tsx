import { Inter } from "next/font/google";
import Footer from "../../../components/Footer";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ShopHeader from "../../../components/ShopHeader";

const inter = Inter({
	subsets: ["latin"],
	display: "swap"
});

type informationLayoutProps = {
	children: React.ReactNode;
};

export default async function InformationLayout({ children }: informationLayoutProps) {
	return (
		<div className={`${inter.className} flex min-h-screen flex-col bg-[rgb(8,8,8)] text-white`}>
			<ShopHeader />
			<div className="flex flex-1 items-stretch">
				{children}
				<ScrollToTopButton />
			</div>
			<Footer />
		</div>
	);
}
