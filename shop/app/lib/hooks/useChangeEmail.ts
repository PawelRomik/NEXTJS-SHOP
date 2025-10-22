import { useState } from "react";
import { EmailAddressResource } from "@clerk/types";
import { useUser } from "@clerk/nextjs";
import { useFeedback } from "../../lib/hooks/useFeedback";
import { useTranslations } from "next-intl";

export const useChangeEmail = () => {
	const { isLoaded, user } = useUser();
	const { errorMessage, successMessage, showError, showSuccess } = useFeedback();

	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const t = useTranslations("settings");
	const [isVerifying, setIsVerifying] = useState(false);
	const [emailObj, setEmailObj] = useState<EmailAddressResource | undefined>(undefined);
	const [passwordCurrent, setPasswordCurrent] = useState("");

	const handleSubmit = async () => {
		if (!user) return;

		try {
			const response = await fetch("/api/clerk/verifypassword", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: user.id, password: passwordCurrent })
			});

			const isVerified = await response.json();

			if (isVerified.verified) {
				const res = await user.createEmailAddress({ email });
				await user.reload();

				const emailAddress = user.emailAddresses.find((a) => a.id === res.id);
				setEmailObj(emailAddress as EmailAddressResource | undefined);

				await emailAddress?.prepareVerification({ strategy: "email_code" });
				setIsVerifying(true);
			} else {
				showError(t("incorrectPassword"));
			}
		} catch (err: any) {
			if (err?.errors?.[0]?.code === "form_identifier_exists") {
				showError(t("emailTaken"));
			} else {
				showError("error");
			}
		}
	};

	const verifyCode = async () => {
		if (!emailObj) return;

		try {
			const emailVerifyAttempt = await emailObj.attemptVerification({ code });
			if (emailVerifyAttempt?.verification.status === "verified") {
				await updateOldEmail();
			} else {
				showError(t("wrongCode"));
			}
		} catch {
			showError(t("error"));
		}
	};

	const updateOldEmail = async () => {
		if (!user) return;
		try {
			const response = await fetch("/api/clerk/email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: user.id })
			});

			await response.json();
			showSuccess(t("emailSuccess"));
			setCode("");
			setPasswordCurrent("");
			setEmail("");
			setIsVerifying(false);
		} catch {
			showError(t("error"));
		}
	};

	return {
		isLoaded,
		user,
		email,
		setEmail,
		code,
		setCode,
		passwordCurrent,
		setPasswordCurrent,
		isVerifying,
		errorMessage,
		successMessage,
		handleSubmit,
		verifyCode
	};
};
