import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import Providers from "./providers";
import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";
import { getTranslations } from "next-intl/server";

const roboto = Roboto({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	variable: "--font-roboto"
});

export async function generateMetadata({
	params: { locale }
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "common" });

	return {
		title: "Ephonix",
		description: t("desc")
	};
}

type RootProps = {
	children: React.ReactNode;
	params: {
		locale: string;
	};
};

export default function RootLayout({ children, params: { locale } }: RootProps) {
	const messages = useMessages();

	return (
		<html lang={locale}>
			<body className={`${roboto.variable} custom-scrollbar`}>
				<Providers>
					<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	);
}
