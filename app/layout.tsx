import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import Providers from "./providers";

const roboto = Roboto({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	variable: "--font-roboto"
});

export const metadata: Metadata = {
	title: "N3XT",
	description: "THE N3XT GENERATION SHOP ON THE INTERNET"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} custom-scrollbar`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
