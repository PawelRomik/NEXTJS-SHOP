"use client";
import { useTranslations } from "next-intl";
import { FormInput } from "./FormInput";
import { FormButton } from "./FormButton";
import { useChangePassword } from "../../lib/hooks/useChangePassword";

export default function ChangePasswordForm() {
	const t = useTranslations("settings");
	const {
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
	} = useChangePassword();

	if (!isLoaded) return null;

	return (
		<div className="flex flex-col items-center gap-4 text-white">
			<h1 className="w-full text-center text-3xl font-bold uppercase">{t("changePassword")}</h1>

			{errorMessage && (
				<p className="text-red-500" aria-live="polite">
					{errorMessage}
				</p>
			)}
			{successMessage && (
				<p className="text-green-500" aria-live="polite">
					{successMessage}
				</p>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className="flex flex-col gap-4"
			>
				<FormInput
					id="current-password"
					label={t("currentPassword")}
					type="password"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
				<FormInput
					id="new-password"
					label={t("newPassword")}
					type="password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<FormInput
					id="confirm-password"
					label={t("confirmNewPassword")}
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<FormButton type="submit" label={t("changePassword")} />
			</form>
		</div>
	);
}
