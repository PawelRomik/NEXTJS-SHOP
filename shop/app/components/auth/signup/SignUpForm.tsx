"use client";
import * as SignUp from "@clerk/elements/sign-up";
import SignUpStartStep from "./SignUpStartStep";
import SignUpVerificationStep from "./SignUpVerificationStep";
import SignUpContinueStep from "./SignUpContinueStep";

export default function SignUpForm() {
	return (
		<div className="dottedBg grid w-full flex-grow items-center justify-center bg-zinc-950 px-4">
			<SignUp.Root>
				<SignUpStartStep />

				<SignUpVerificationStep />

				<SignUpContinueStep />
			</SignUp.Root>
		</div>
	);
}
