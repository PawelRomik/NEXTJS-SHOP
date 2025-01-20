import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function CategoryShowcase({
	category
}: {
	category: keyof IntlMessages["categories"];
}) {
	const t = await getTranslations();

	return (
		<div className="bg3d relative mt-3 grid h-[500px] w-full grid-cols-[2fr_6fr] gap-4 overflow-hidden bg-cover  bg-center bg-no-repeat  shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)]">
			<div className=" z-[4] flex flex-col justify-center gap-2  px-5  text-white">
				<div className="flex w-full flex-col">
					<h1 className="py-3 text-4xl font-bold">{t(`categories.${category}`)}</h1>
					<div className="w-full border-[5px] border-transparent border-t-red-600 "></div>
					<div className="w-[90%] border-[3px] border-transparent border-t-red-700"></div>
				</div>
				<p>
					Explore the latest tech and gaming gear, featuring cutting-edge components and accessories
					designed to elevate your experience. Stay ahead with innovation at your fingertips.
				</p>

				<Link href="/new" className="mb-5  flex w-full flex-col items-end">
					<button className="mr-10 w-[200px] rounded-lg bg-red-600 p-3 font-bold text-white hover:bg-red-500">
						{t("productSection.check")}
					</button>
				</Link>
			</div>
			<div className=" z-[3] flex items-center justify-around bg-contain">
				<div
					style={{ backgroundImage: `url('/i1.png')` }}
					className="mirror h-[400px] w-[400px] bg-contain bg-center bg-no-repeat"
				></div>
				<div
					style={{ backgroundImage: `url('/i2.png')` }}
					className="mirror   h-[400px] w-[400px] bg-contain bg-center bg-no-repeat"
				></div>
				<div
					style={{ backgroundImage: `url('/i3.webp')` }}
					className="mirror  h-[400px] w-[400px] bg-contain bg-center bg-no-repeat"
				></div>
			</div>
		</div>
	);
}
