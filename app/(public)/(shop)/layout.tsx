import { Inter } from "next/font/google";

import Footer from "../../components/Footer";
import ShopHeader from "../../components/ShopHeader";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import Pagination from "../../components/Pagination";
const inter = Inter({
	subsets: ["latin"],
	display: "swap"
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={`${inter.className} flex min-h-screen flex-col`}>
			<ShopHeader />
			<div className="flex-1">
				{children}
				<ScrollToTopButton />
			</div>

			<Footer />
		</div>
	);
}
