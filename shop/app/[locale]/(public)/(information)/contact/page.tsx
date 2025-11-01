import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import logo from "../../../../../public/logolg.png";

export async function generateMetadata({
	params: { locale }
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "information" });

	return {
		title: `${t("contact")} | Ephonix`
	};
}

export default function ContactPage() {
	const t = useTranslations();

	return (
		<main className="flex flex-1 flex-col justify-start ">
			<div className="my-3 flex bg-red-600 px-6 py-3 text-4xl font-bold uppercase">
				<h1>{t("information.contact")}</h1>
			</div>
			<div className="flex h-full w-full">
				<div className="flex h-full flex-[3]">
					<div>
						<p className="bg-[rgb(16,16,16)] p-2 px-6">
							<i className="ri-phone-fill"></i> 123 456 789
						</p>
						<p className="bg-[rgb(8,8,8)] p-2  px-6">
							<i className="ri-mail-fill"></i> Ephonix@gmail.com
						</p>
						<p className="bg-[rgb(16,16,16)] p-2  px-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu
							ante viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices
							ac ut ipsum.
						</p>
					</div>
					<div className="flex h-full flex-1 items-center justify-center overflow-hidden bg-[rgb(16,16,16)]">
						<Image
							src={logo}
							width={400}
							height={400}
							className=" h-full object-contain"
							alt={t("common.shopLogo")}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
