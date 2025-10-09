"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import AuthField from "../AuthField";
import StepContainer from "./StepContainer";
import { useTranslations } from "next-intl";
import { createGetErrorMessage } from "../../../lib/utils/authErrorMessages";

export default function SignUpStartStep() {
	const t = useTranslations("auth");
	const getErrorMessage = createGetErrorMessage(t);

	return (
		<SignUp.Step name="start">
			<StepContainer title={t("createAccount")}>
				<div className="space-y-4">
					<AuthField
						name="emailAddress"
						type="email"
						label={t("email")}
						placeholder={t("enterEmail")}
						getErrorMessage={getErrorMessage}
					/>
					<AuthField
						name="password"
						type="password"
						label={t("password")}
						placeholder="••••••••"
						getErrorMessage={getErrorMessage}
					/>
				</div>

				<SignUp.Action
					submit
					className="w-full rounded bg-red-600 px-4 py-2 text-center text-sm font-bold uppercase text-white shadow outline-none ring-1 ring-inset ring-red-600 hover:bg-red-700 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-red-600 active:text-white/70"
				>
					{t("signUp")}
				</SignUp.Action>

				<p className="text-center text-sm text-white">
					{t("haveAnAccount")}{" "}
					<Clerk.Link
						navigate="sign-in"
						className="font-bold uppercase text-white decoration-white/20 underline-offset-4 outline-none hover:text-red-500 hover:underline focus-visible:underline"
					>
						{t("signIn")}
					</Clerk.Link>
				</p>
			</StepContainer>
		</SignUp.Step>
	);
}
