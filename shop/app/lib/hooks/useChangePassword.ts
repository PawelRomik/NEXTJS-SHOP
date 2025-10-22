import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useFeedback } from "../../lib/hooks/useFeedback";
import { useTranslations } from "next-intl";

export const useChangePassword = () => {
	const { isLoaded, user } = useUser();
	const { errorMessage, successMessage, showError, showSuccess } = useFeedback();

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const t = useTranslations("settings");

	const handleSubmit = async () => {
		if (!user) return;

		if (newPassword.length < 8) return showError(t("shortPassword"));
		if (newPassword !== confirmPassword) return showError(t("passwordsNoMatch"));

		try {
			await user.updatePassword({ currentPassword, newPassword });
			await user.reload();
			showSuccess(t("passwordSuccess"));

			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (err: any) {
			if (Array.isArray(err?.errors) && err.errors[0]?.code === "form_password_validation_failed") {
				showError(t("incorrectPassword"));
			} else {
				showError(t("error"));
			}
		}
	};

	return {
		isLoaded,
		currentPassword,
		setCurrentPassword,
		newPassword,
		setNewPassword,
		confirmPassword,
		setConfirmPassword,
		errorMessage,
		successMessage,
		handleSubmit
	};
};
