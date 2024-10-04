import Footer from "../../../components/Footer";
import ShopHeader from "../../../components/ShopHeader";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { userCategories } from "../../../data/categories";
import { useTranslations } from "next-intl";

type PrivateLayoutProps = {
	children: React.ReactNode;
};

export default function UserLayout({ children }: PrivateLayoutProps) {
	const t = useTranslations();
	return (
		<div className={`roboto flex min-h-screen flex-col`}>
			<ShopHeader />
			<main className="flex flex-1 bg-zinc-950">
				<div className="flex  min-w-[250px] flex-[10%] border-r-2 border-zinc-800 bg-black">
					<ul className="flex w-full flex-col items-center">
						{userCategories.map((category) => (
							<Link className="w-full" key={category.name} href={`/user/${category.slug}`}>
								<li className="w-full border-b-2 border-zinc-800 p-[1rem] pl-[2rem] text-right text-white">
									{t(`categories.${category.slug}`)}
									<i className="ri-arrow-right-s-line"></i>
								</li>
							</Link>
						))}
						<li className="mt-auto w-full border-t-2 border-zinc-800 p-[1rem] pl-[2rem] text-right text-red-600">
							<SignOutButton>
								<button>
									{t("hamburger.logOut")} <i className="ri-arrow-right-s-line "></i>
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
