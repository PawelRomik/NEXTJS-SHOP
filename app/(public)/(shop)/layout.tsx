import { Inter } from "next/font/google";

import Footer from "../../components/Footer";
import ShopHeader from "../../components/ShopHeader";
const inter = Inter({
	subsets: ["latin"],
	display: "swap"
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={`${inter.className} flex min-h-screen flex-col`}>
			<ShopHeader />
			{children}
			<Footer />
		</div>
	);
}
