export const dynamic = "force-dynamic";

import Link from "next/link";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ShopHeader from "./components/ShopHeader";
import Footer from "./components/Footer";

export default function NotFound() {
	return (
		<div className={` roboto flex min-h-screen flex-col`}>
			<ShopHeader />
			<div className="flex flex-1 items-stretch">
				<main className=" flex w-full flex-col items-center justify-center gap-6 bg-black p-6 text-2xl text-white">
					<h2 className="text-3xl font-bold text-white">Not Found!</h2>
					<p className="text-2xl text-zinc-300">Could not find requested resource</p>
					<Link href="/" className=" text-2xl font-bold text-zinc-300">
						Home
					</Link>
				</main>
				<ScrollToTopButton />
			</div>
			<Footer />
		</div>
	);
}
