"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import nextLogo from "../../public/logolg.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SignInForm() {
	const t = useTranslations();
	return (
		<div className="dottedBg grid w-full flex-grow items-center  px-4 sm:justify-center">
			<SignIn.Root>
				<SignIn.Step
					name="start"
					className="w-full space-y-6 rounded-2xl border-4 border-red-600 bg-zinc-950 px-8 py-10 shadow-md ring-1 ring-black/5 sm:w-96"
				>
					<header className="flex flex-col items-center justify-center text-center">
						<Image src={nextLogo} className="w-24" alt={t("common.shopLogo")} />
						<h1 className="mt-4 text-3xl font-bold uppercase tracking-tight text-white">
							{t("auth.signInTitle")}
						</h1>
					</header>

					<Clerk.GlobalError className="block text-sm text-red-500" />

					<div className="space-y-4">
						<Clerk.Field name="identifier" className="space-y-2">
							<Clerk.Label className="text-sm font-medium uppercase text-white">
								{t("auth.username")}
							</Clerk.Label>
							<Clerk.Input
								type="text"
								required
								className="w-full rounded bg-white px-3.5 py-2 text-sm text-black outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-white data-[invalid]:ring-red-500"
								placeholder={t("auth.enterUsername")}
							/>
							<Clerk.FieldError className="block text-sm text-red-500" />
						</Clerk.Field>

						<Clerk.Field name="password" className="space-y-2">
							<Clerk.Label className="text-sm font-medium uppercase text-white">
								{t("auth.password")}
							</Clerk.Label>
							<Clerk.Input
								type="password"
								required
								className="w-full rounded bg-white px-3.5 py-2 text-sm text-black outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-white data-[invalid]:ring-red-500"
								placeholder="••••••••"
							/>
							<Clerk.FieldError className="block text-sm text-red-500" />
						</Clerk.Field>
					</div>

					<SignIn.Action
						submit
						className="w-full rounded bg-red-600 px-4 py-2 text-center text-sm font-bold uppercase text-white shadow outline-none ring-1 ring-inset ring-red-600 hover:bg-red-700 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-red-600 active:text-white/70"
					>
						{t("auth.signIn")}
					</SignIn.Action>

					<p className="flex items-center justify-center gap-2 text-center text-sm text-white">
						{t("auth.noAccount")}
						<Clerk.Link
							navigate="sign-up"
							className="font-bold uppercase text-white decoration-white/20 underline-offset-4 outline-none hover:text-red-500 hover:underline focus-visible:underline"
						>
							{t("auth.createAccount")}
						</Clerk.Link>
					</p>
				</SignIn.Step>
			</SignIn.Root>
		</div>
	);
}
