"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useTranslations } from "next-intl";
import { createGetErrorMessage } from "../../lib/utils/authErrorMessages";
import AuthField from "./AuthField";
import StepContainer from "./signup/StepContainer";

export default function SignInForm() {
	const t = useTranslations("auth");
	const getErrorMessage = createGetErrorMessage(t);

	return (
		<div className="dottedBg grid w-full flex-grow items-center  px-4 sm:justify-center">
			<SignIn.Root>
				<SignIn.Step name="start">
					<StepContainer title={t("signInTitle")}>
						<div className="space-y-4">
							<AuthField
								name="identifier"
								label={t("username")}
								placeholder={t("enterUsername")}
								getErrorMessage={getErrorMessage}
							/>
							<AuthField
								name="password"
								label={t("password")}
								type="password"
								placeholder="••••••••"
								getErrorMessage={getErrorMessage}
							/>
						</div>

						<SignIn.Action
							submit
							className="w-full rounded bg-red-600 px-4 py-2 text-center text-sm font-bold uppercase text-white shadow outline-none ring-1 ring-inset ring-red-600 hover:bg-red-700 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-red-600 active:text-white/70 disabled:opacity-70"
						>
							{t("signIn")}
						</SignIn.Action>

						<p className="flex items-center justify-center gap-2 text-center text-sm text-white">
							{t("noAccount")}
							<Clerk.Link
								navigate="sign-up"
								className="font-bold uppercase text-white decoration-white/20 underline-offset-4 outline-none hover:text-red-500 hover:underline focus-visible:underline"
							>
								{t("createAccount")}
							</Clerk.Link>
						</p>
					</StepContainer>
				</SignIn.Step>
			</SignIn.Root>
		</div>
	);
}
