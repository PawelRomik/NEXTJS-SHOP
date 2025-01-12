import { getTranslations } from "next-intl/server";
import productImage from "../../public/i1.png";
import Image from "next/image";
import Link from "next/link";

type ProductOtherSectionProps = {
	category: keyof IntlMessages["categories"];
	num: number;
};

export default async function CategoryBanner({ category, num }: ProductOtherSectionProps) {
	const t = await getTranslations("categories");

	return (
		<div className="relative z-[20] h-[400px] w-full overflow-hidden bg-red-700 bg-[size:60%_100%]  bg-center ">
			<div className=" flex h-full w-full flex-col items-center justify-center overflow-hidden bg-zinc-950  bg-center bg-no-repeat py-3 lg:flex-row lg:gap-5">
				{num % 2 == 1 && (
					<div className="absolute left-[5%] flex h-[200%] w-[200px] rotate-[20deg] items-center justify-center">
						<div className="h-full w-full bg-white"></div>
						<div className="h-full w-full"></div>
						<div className="h-full w-full bg-red-500"></div>
						<div className="h-full w-full"></div>
						<div className="h-full w-full bg-red-600"></div>
					</div>
				)}
				{num % 2 == 0 && (
					<Image
						src={productImage}
						className="img mr-[50px]  flex h-[40%] w-auto  self-center p-5 lg:h-full"
						alt={category}
					></Image>
				)}
				<div className=" flex h-full w-[450px] flex-col items-start justify-around text-white">
					<h2 className="text-5xl font-bold uppercase">{t(category)}</h2>
					<p className="w-[50%]">
						Explore the latest tech and gaming gear, featuring cutting-edge components and
						accessories designed to elevate your experience. Stay ahead with innovation at your
						fingertips.
					</p>
					<Link href="/new">
						<button className="w-[300px] rounded-lg bg-red-600 p-4 text-2xl font-bold text-white hover:bg-red-500">
							Check now
						</button>
					</Link>
				</div>
				{num % 2 == 1 && (
					<Image
						src={productImage}
						className="img  flex h-[40%] w-auto  self-center p-5 lg:h-full"
						alt={category}
					></Image>
				)}
				{num % 2 == 0 && (
					<div className="absolute right-[5%] flex h-[200%] w-[200px] rotate-[20deg] items-center justify-center">
						<div className="h-full w-full bg-red-600"></div>
						<div className="h-full w-full"></div>
						<div className="h-full w-full bg-red-500"></div>
						<div className="h-full w-full"></div>
						<div className="h-full w-full bg-white"></div>
					</div>
				)}
			</div>
		</div>
	);
}
