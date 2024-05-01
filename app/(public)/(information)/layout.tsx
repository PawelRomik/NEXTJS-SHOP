import { Inter } from "next/font/google";

import Footer from "../../components/Footer";
import InformationHeader from "../../components/InformationHeader";
const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function InformationLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={`${inter.className} flex min-h-screen flex-col`}>
			<InformationHeader />
			{children}
			<Footer />
		</div>
	);
}
