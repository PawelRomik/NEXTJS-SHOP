import { Inter } from "next/font/google";
import Footer from "../../components/Footer";
import InformationHeader from "../../components/InformationHeader";
import ScrollToTopButton from "../../components/ScrollToTopButton";

const inter = Inter({
	subsets: ["latin"],
	display: "swap"
});

export default function InformationLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={`${inter.className} flex min-h-screen flex-col bg-zinc-950 text-white`}>
			<InformationHeader />
			<div className="flex flex-1 items-stretch pl-6">
				{children}
				<ScrollToTopButton />
			</div>
			<Footer />
		</div>
	);
}
