"use client";
import * as SignUp from "@clerk/elements/sign-up";
import AuthField from "../AuthField";
import StepContainer from "./StepContainer";
import { useTranslations } from "next-intl";
import { createGetErrorMessage } from "../../../lib/utils/authErrorMessages";

export default function SignUpContinueStep() {
	const t = useTranslations("auth");
	const getErrorMessage = createGetErrorMessage(t);
	return (
		<SignUp.Step name="continue">
			<StepContainer title={t("enterUsername")}>
				<AuthField
					name="username"
					type="text"
					label={t("username")}
					placeholder={t("username")}
					getErrorMessage={getErrorMessage}
				/>
				<SignUp.Action
					submit
					className="w-full rounded bg-red-600 px-4 py-2 text-center text-sm font-bold uppercase text-white shadow outline-none ring-1 ring-inset ring-red-600 hover:bg-red-700 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-red-600 active:text-white/70"
				>
					{t("continue")}
				</SignUp.Action>
			</StepContainer>
		</SignUp.Step>
	);
}
