"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

function ChangePasswordForm() {
	const t = useTranslations("settings");
	const { isLoaded, user } = useUser();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	if (!isLoaded || !user?.id) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		if (newPassword.length < 8) {
			setErrorMessage(t("shortPassword"));
			return;
		}

		if (newPassword !== confirmPassword) {
			setErrorMessage(t("passwordsNoMatch"));
			return;
		}

		try {
			await user.updatePassword({ currentPassword, newPassword });
			await user.reload();
			setSuccessMessage(t("passwordSuccess"));
			setNewPassword("");
			setConfirmPassword("");
			setCurrentPassword("");
		} catch (err: any) {
			if (err.errors[0].code == "form_password_validation_failed") {
				setErrorMessage(t("incorrectPassword"));
			} else setErrorMessage("error");
		}

		setTimeout(() => {
			setErrorMessage(null);
			setSuccessMessage(null);
		}, 3000);
	};

	return (
		<div className="flex flex-col items-center gap-4 text-white">
			<h1 className="w-full text-center text-3xl font-bold uppercase">{t("changePassword")}</h1>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			{successMessage && <p className="text-green-500">{successMessage}</p>}
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-5">
					<label htmlFor="current-password">{t("currentPassword")}</label>
					<input
						id="current-password"
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						className="rounded p-2 text-black"
					/>
				</div>
				<div className="flex items-center justify-between gap-5">
					<label htmlFor="new-password">{t("newPassword")}</label>
					<input
						id="new-password"
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="rounded p-2 text-black"
					/>
				</div>
				<div className="flex items-center justify-between gap-5">
					<label htmlFor="confirm-password">{t("confirmNewPassword")}</label>
					<input
						id="confirm-password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="rounded p-2 text-black"
					/>
				</div>
				<button type="submit" className="rounded bg-red-600 px-4 py-2 text-white">
					{t("changePassword")}
				</button>
			</form>
		</div>
	);
}

export default ChangePasswordForm;
