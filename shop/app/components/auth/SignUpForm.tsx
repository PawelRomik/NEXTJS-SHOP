"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import nextLogo from "../../../public/logolg.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SignUpForm() {
	const t = useTranslations();

	const getErrorMessage = (message: string) => {
		switch (message) {
			case "That email address is taken. Please try another.":
				return t("auth.emailTaken");
			case "email_address must be a valid email address.":
				return t("auth.invalidEmail");
			case "Passwords must be 8 characters or more.":
				return t("auth.shortPassword");
			case "Password has been found in an online data breach. For account safety, please use a different password.":
				return t("auth.strongerPassword");
			case "Incorrect code":
				return t("auth.incorrectCode");
			case "That username is taken. Please try another.":
				return t("auth.usernameTaken");
			case "Username must be between 4 and 64 characters long.":
				return t("auth.wrongUsername");
			default:
				return t("auth.unexpectedError");
		}
	};
	return (
		<div className="dottedBg grid w-full flex-grow items-center bg-zinc-950 px-4 sm:justify-center">
			<SignUp.Root>
				<SignUp.Step
					name="start"
					className="w-full space-y-6 rounded-2xl border-4 border-red-600 bg-zinc-950 px-8 py-10 shadow-md ring-1 ring-black/5 sm:w-96"
				>
					<header className="flex flex-col items-center justify-center text-center">
						<Image src={nextLogo} alt={t("common.shopLogo")} className="w-24" />
						<h1 className="mt-4 text-3xl font-bold uppercase tracking-tight text-white">
							{t("auth.createAccount")}
						</h1>
					</header>

					<Clerk.GlobalError className="block text-sm text-red-500" />

					<div className="space-y-4">
						<Clerk.Field name="emailAddress" className="space-y-2">
							<Clerk.Label className="text-sm font-bold uppercase text-white">
								{t("auth.email")}
							</Clerk.Label>
							<Clerk.Input
								type="email"
								required
								className="w-full rounded bg-white px-3.5 py-2 text-sm text-black outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-white data-[invalid]:ring-red-500"
								placeholder={t("auth.enterEmail")}
							/>
							<Clerk.FieldState>
								{({ state, message = "error" }) =>
									state === "error" && (
										<span className="block text-sm text-red-500">{getErrorMessage(message)}</span>
									)
								}
							</Clerk.FieldState>
						</Clerk.Field>
						<Clerk.Field name="password" className="space-y-2">
							<Clerk.Label className="text-sm font-bold uppercase text-white">
								{t("auth.password")}
							</Clerk.Label>
							<Clerk.Input
								type="password"
								required
								className="w-full rounded bg-white px-3.5 py-2 text-sm text-black outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-white data-[invalid]:ring-red-500"
								placeholder="••••••••"
							/>
							<Clerk.FieldState>
								{({ state, message = "error" }) =>
									state === "error" && (
										<span className="block text-sm text-red-500">{getErrorMessage(message)}</span>
									)
								}
							</Clerk.FieldState>
						</Clerk.Field>
					</div>

					<SignUp.Action
						submit
						className="w-full rounded bg-red-600 px-4 py-2 text-center text-sm font-bold uppercase text-white shadow outline-none ring-1 ring-inset ring-red-600 hover:bg-red-700 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-red-600 active:text-white/70"
					>
						{t("auth.signUp")}
					</SignUp.Action>

					<p className="flex items-center justify-center gap-2 text-center text-sm text-white">
						{t("auth.haveAnAccount")}
						<Clerk.Link
							navigate="sign-in"
							className="font-bold uppercase text-white decoration-white/20 underline-offset-4 outline-none hover:text-red-500 hover:underline focus-visible:underline"
						>
							{t("auth.signIn")}
						</Clerk.Link>
					</p>
				</SignUp.Step>

				<SignUp.Step
					name="verifications"
					className="w-full space-y-6 rounded-2xl border-4 border-red-600 bg-zinc-950 px-8 py-10 shadow-md ring-1 ring-black/5 sm:w-96"
				>
					<header className="flex flex-col items-center justify-center text-center">
						<Image src={nextLogo} alt={t("common.shopLogo")} className="w-24" />
						<h1 className="mt-4 text-3xl font-bold uppercase tracking-tight text-white">
							{t("auth.verifyEmail")}
						</h1>
					</header>
					<Clerk.GlobalError className="block text-sm text-red-500" />
					<SignUp.Strategy name="email_code">
						<Clerk.Field name="code" className="space-y-2">
							<Clerk.Label className="text-sm font-bold uppercase text-white">
								{t("auth.emailCode")}
							</Clerk.Label>
							<Clerk.Input
								type="otp"
								required
								className="w-full rounded bg-white px-3.5 py-2 text-sm text-black outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-white data-[invalid]:ring-red-500"
							/>
							<Clerk.FieldState>
								{({ state, message = "error" }) =>
									state === "error" && (
										<span className="block text-sm text-red-500">{getErrorMessage(message)}</span>
									)
								}
							</Clerk.FieldState>
						</Clerk.Field>
						<SignUp.Action
							submit
							className="w-full rounded bg-red-600 px-4 py-2 text-center text-sm font-bold uppercase text-white shadow outline-none ring-1 ring-inset ring-red-600 hover:bg-red-700 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-red-600 active:text-white/70"
						>
							{t("auth.verify")}
						</SignUp.Action>
					</SignUp.Strategy>
					<p className="text-center text-sm text-white">
						{t("auth.haveAnAccount")}
						<Clerk.Link
							navigate="sign-in"
							className="font-bold uppercase text-white decoration-white/20 underline-offset-4 outline-none hover:text-red-500 hover:underline focus-visible:underline"
						>
							{t("auth.signIn")}
						</Clerk.Link>
					</p>
				</SignUp.Step>

				<SignUp.Step
					name="continue"
					className="w-full space-y-6 rounded-2xl border-4 border-red-600 bg-zinc-950 px-8 py-10 shadow-md ring-1 ring-black/5 sm:w-96"
				>
					<header className="flex flex-col items-center justify-center text-center">
						<Image src={nextLogo} className="w-24" alt={t("common.shopLogo")} />
						<h1 className="mt-4 text-3xl font-bold uppercase tracking-tight text-white">
							{t("auth.enterUsername")}
						</h1>
					</header>
					<Clerk.GlobalError className="block text-sm text-red-500" />
					<Clerk.Field name="username" className="space-y-2">
						<Clerk.Label className="text-sm font-bold uppercase text-white">
							{t("auth.username")}
						</Clerk.Label>
						<Clerk.Input
							type="text"
							required
							className="w-full rounded bg-white px-3.5 py-2 text-sm text-black outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-white data-[invalid]:ring-red-500"
							placeholder={t("auth.username")}
						/>
						<Clerk.FieldState>
							{({ state, message = "error" }) =>
								state === "error" && (
									<span className="block text-sm text-red-500">{getErrorMessage(message)}</span>
								)
							}
						</Clerk.FieldState>
					</Clerk.Field>
					<SignUp.Action
						submit
						className="w-full rounded bg-red-600 px-4 py-2 text-center text-sm font-bold uppercase text-white shadow outline-none ring-1 ring-inset ring-red-600 hover:bg-red-700 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-red-600 active:text-white/70"
					>
						{t("auth.continue")}
					</SignUp.Action>
					<p className="text-center text-sm text-white">
						{t("auth.haveAnAccount")}
						<Clerk.Link
							navigate="sign-in"
							className="font-bold uppercase text-white decoration-white/20 underline-offset-4 outline-none hover:text-red-500 hover:underline focus-visible:underline"
						>
							{t("auth.signIn")}
						</Clerk.Link>
					</p>
				</SignUp.Step>
			</SignUp.Root>
		</div>
	);
}
