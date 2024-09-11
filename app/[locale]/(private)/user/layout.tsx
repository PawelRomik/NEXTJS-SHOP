import Footer from "../../../components/Footer";
import ShopHeader from "../../../components/ShopHeader";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

type PrivateLayoutProps = {
	children: React.ReactNode;
};
const categories = [
	{ name: "Settings", slug: "settings" },
	{ name: "Order History", slug: "orders" }
];

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
	return (
		<div className={`roboto flex min-h-screen flex-col`}>
			<ShopHeader />
			<main className="flex flex-1 bg-zinc-950">
				<div className="flex  min-w-[250px] flex-[10%] border-r-2 border-zinc-800 bg-black">
					<ul className="flex w-full flex-col items-center">
						{categories.map((cat) => (
							<Link className="w-full" key={cat.name} href={`/user/${cat.slug}`}>
								<li className="w-full border-b-2 border-zinc-800 p-[1rem] pl-[2rem] text-white">
									{cat.name} <i className="ri-arrow-right-s-line"></i>
								</li>
							</Link>
						))}
						<li className="mt-auto w-full border-t-2 border-zinc-800 p-[1rem] pl-[2rem] text-red-600">
							<SignOutButton>
								<button>
									Log Out <i className="ri-arrow-right-s-line "></i>
								</button>
							</SignOutButton>
						</li>
					</ul>
				</div>
				<div className="flex  flex-[90%]">{children}</div>
			</main>

			<ScrollToTopButton />
			<Footer />
		</div>
	);
}
