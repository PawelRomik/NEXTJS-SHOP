import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import * as Avatar from "@radix-ui/react-avatar";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HamburgerAccountSection() {
	const { user } = useUser();
	const t = useTranslations();

	return (
		<div className="flex h-full flex-col items-center justify-center gap-3 md:gap-5">
			<SignedIn>
				<h1 className="text-3xl font-bold uppercase md:text-5xl ">{user?.username}</h1>
			</SignedIn>
			<Avatar.Root className="inline-flex  w-full  select-none items-center justify-center overflow-hidden rounded-full    align-middle">
				<Avatar.Image
					className="size-[150px] rounded-full border-2 border-red-600 bg-[rgb(11,11,11)]   object-cover md:size-[250px]"
					src={user?.imageUrl}
					alt="avatar"
				/>
				<Avatar.Fallback
					className="leading-1 relative flex size-[150px] items-center justify-center overflow-hidden rounded-full border-2 border-red-600 bg-[rgb(11,11,11)] text-[15px]  font-medium text-white md:size-[250px]"
					delayMs={600}
				>
					{user?.username ? (
						user.username.substring(0, 2).toUpperCase()
					) : (
						<i className="ri-user-fill absolute h-full origin-bottom translate-y-[20%] rounded-full  text-9xl  md:translate-y-[30%] md:text-[12rem]"></i>
					)}
				</Avatar.Fallback>
			</Avatar.Root>
			<div className="mb-3 text-2xl tracking-wider">
				<SignedIn>
					<div className="flex w-full flex-col items-center justify-center gap-2">
						<div className="flex w-full items-center justify-center gap-5 font-bold ">
							<Link href={"/user/settings"} title={t("hamburger.settings")}>
								<button className=" flex gap-1 border-2 border-red-600 bg-[rgb(11,11,11)] p-1 px-4 text-base md:p-2 md:px-6 md:text-xl">
									<i className="ri-settings-2-line"></i>
									{t("hamburger.settings").toUpperCase()}
								</button>
							</Link>
							<SignOutButton>
								<button className=" flex gap-1 border-2 border-red-600 bg-[rgb(11,11,11)] p-1 px-4 text-base md:p-2 md:px-6 md:text-xl">
									<i className="ri-logout-box-line"></i>
									{t("hamburger.logOut").toUpperCase()}
								</button>
							</SignOutButton>
						</div>
					</div>
				</SignedIn>
				<SignedOut>
					<div className="flex flex-col items-center justify-center gap-2">
						<p className="text-2xl font-bold uppercase md:text-4xl">{t("hamburger.notLoggedIn")}</p>
						<SignInButton>
							<button className=" flex gap-1 border-2 border-red-600 bg-[rgb(11,11,11)] p-1 px-4 text-base md:p-2 md:px-6 md:text-xl">
								<i className="ri-login-box-line"></i>
								{t("sign.signIn").toUpperCase()}
							</button>
						</SignInButton>
					</div>
				</SignedOut>
			</div>
		</div>
	);
}
