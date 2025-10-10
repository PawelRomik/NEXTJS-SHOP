import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function BundlesBanner() {
	const t = await getTranslations("productSection");
	return (
		<div
			className={`flex h-full flex-col items-center justify-center gap-3 text-center text-2xl text-white lg:mr-[10%] lg:items-end lg:text-right`}
		>
			<h2 className="text-shadow-lg text-4xl font-bold lg:text-5xl">{t("bundlesTitle")}</h2>
			<h4 className="text-shadow-lg w-[300px] py-3 text-lg text-zinc-200 lg:w-[500px] lg:text-xl">
				{t("bundlesDesc")}
			</h4>
			<Link href="/new">
				<button className="w-[200px] rounded-lg bg-red-600 p-3 font-bold text-white hover:bg-red-500">
					{t("check")}
				</button>
			</Link>
		</div>
	);
}
