import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function SaleProductsSection() {
	const t = await getTranslations("productSection");

	return (
		<div
			style={{ backgroundImage: `url('/bg2.jpeg')` }}
			className="relative mt-3 h-[600px] w-full  bg-cover bg-center bg-no-repeat shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)]"
		>
			<div className="h-full w-full bg-[rgba(0,0,0,0.85)]">
				<div
					className={`flex h-full flex-col items-center justify-center gap-3 text-center text-2xl text-white lg:items-center`}
				>
					<h2 className="text-shadow-lg text-4xl font-bold lg:text-5xl">{t("saleTitle")}</h2>
					<h4 className="text-shadow-lg w-[300px] py-3 text-center text-lg text-zinc-200 lg:w-[500px] lg:text-left lg:text-xl">
						{t("saleDesc")}
					</h4>
					<Link href="/new">
						<button className="w-[200px] rounded-lg bg-red-600 p-3 font-bold text-white hover:bg-red-500">
							{t("check")}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
