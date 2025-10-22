import Footer from "../../../components/footer/Footer";
import ShopHeader from "../../../components/header/ShopHeader";
import ScrollToTopButton from "../../../components/common/ScrollToTopButton";
import { SignOutButton } from "@clerk/nextjs";
import { userCategories } from "../../../data/categories";
import { useTranslations } from "next-intl";
import UserCategoryLink from "../../../components/user-links/UserCategoryLink";

type PrivateLayoutProps = {
	children: React.ReactNode;
};

export default function UserLayout({ children }: PrivateLayoutProps) {
	const t = useTranslations();
	return (
		<div className={`roboto flex min-h-screen flex-col`}>
			<ShopHeader />
			<main className="flex flex-1  ">
				<div className="hidden min-w-[250px]  flex-[10%] border-r-4 border-red-600 bg-[rgb(12,12,12)]  lg:flex">
					<ul className="flex w-full flex-col items-center gap-3 pt-1">
						{userCategories.map((category) => (
							<UserCategoryLink key={category.slug} category={category} />
						))}
						<UserCategoryLink key={"order"} category={{ name: "Order", slug: "orders" }} />
						<li className="mt-auto w-full border-t-4 border-[rgb(20,20,20)] bg-[rgb(20,20,20)] p-[1rem] pl-[2rem] text-center font-bold uppercase text-white  transition hover:bg-red-600 hover:text-white">
							<SignOutButton>
								<button className="uppercase">{t("hamburger.logOut")}</button>
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
