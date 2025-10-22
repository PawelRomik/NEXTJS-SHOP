"use client";
import { useTranslations } from "next-intl";
import { FormInput } from "./FormInput";
import { FormButton } from "./FormButton";
import { useChangeEmail } from "../../lib/hooks/useChangeEmail";

const ChangeEmailForm = () => {
	const t = useTranslations("settings");

	const {
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
	} = useChangeEmail();

	if (!isLoaded || !user?.id) return null;

	if (isVerifying) {
		return (
			<div className="flex flex-col items-center gap-4 text-white">
				<h1 className="w-full text-center text-3xl font-bold uppercase">{t("verifyEmail")}</h1>
				{errorMessage && <p className="text-red-500">{errorMessage}</p>}
				{successMessage && <p className="text-green-500">{successMessage}</p>}

				<form
					onSubmit={(e) => {
						e.preventDefault();
						verifyCode();
					}}
					className="flex flex-col gap-4"
				>
					<FormInput
						id="code"
						label={t("enterCode")}
						type="text"
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
					<FormButton type="submit" label={t("verify")} />
				</form>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center gap-4 text-white">
			<h1 className="w-full text-center text-3xl font-bold uppercase">{t("changeEmail")}</h1>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			{successMessage && <p className="text-green-500">{successMessage}</p>}

			<form
				autoComplete="off"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className="flex flex-col gap-4"
			>
				<FormInput
					id="email"
					label={t("newEmail")}
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<FormInput
					id="passwordCurrent"
					label={t("currentPassword")}
					type="password"
					value={passwordCurrent}
					onChange={(e) => setPasswordCurrent(e.target.value)}
				/>
				<FormButton type="submit" label={t("changeEmail")} />
			</form>
		</div>
	);
};

export default ChangeEmailForm;
