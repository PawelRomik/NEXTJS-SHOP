import { Inter } from "next/font/google";
import Footer from "../../../components/Footer";
import InformationHeader from "../../../components/InformationHeader";
import ScrollToTopButton from "../../../components/ScrollToTopButton";

const inter = Inter({
	subsets: ["latin"],
	display: "swap"
});

type informationLayoutProps = {
	children: React.ReactNode;
};

export default async function InformationLayout({ children }: informationLayoutProps) {
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
