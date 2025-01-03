import Link from "next/link";

export default function NewProductsSection() {
	return (
		<div className="mb-3 h-[600px] w-full bg-purple-500 bg-[url('../public/newBg.png')]  bg-cover bg-center bg-no-repeat shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)] ">
			<div className="h-full w-full bg-[rgba(0,0,0,0.7)] lg:bg-[rgba(0,0,0,0.3)]">
				<div className="flex h-full flex-col items-center  justify-center gap-3 text-2xl text-white lg:ml-[10%]   lg:items-start ">
					<h2 className="text-4xl font-bold lg:text-5xl">Gear Up & Game On</h2>
					<h4 className="w-[300px] py-3 text-center text-lg text-zinc-200 lg:w-[500px] lg:text-left lg:text-xl">
						Explore the latest tech and gaming gear, featuring cutting-edge components and
						accessories designed to elevate your experience. Stay ahead with innovation at your
						fingertips.
					</h4>
					<Link href="/new">
						<button className="w-[200px] rounded-lg bg-red-600 p-3 font-bold text-white hover:bg-red-500">
							Check
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
