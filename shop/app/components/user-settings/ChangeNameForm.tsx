"use client";
import { useTranslations } from "next-intl";
import { FormInput } from "./FormInput";
import { FormButton } from "./FormButton";
import { useChangeName } from "../../lib/hooks/useChangeName";

export default function ChangeNameForm() {
	const t = useTranslations("settings");
	const { isLoaded, username, setUsername, errorMessage, successMessage, handleSubmit } =
		useChangeName();

	if (!isLoaded) return null;

	return (
		<div className="flex flex-col items-center gap-4 text-white">
			<h1 className="w-full text-center text-3xl font-bold uppercase">{t("changeUsername")}</h1>
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
					id="username"
					label={t("newUsername")}
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					minLength={4}
				/>
				<FormButton type="submit" label={t("changeUsername")} />
			</form>
		</div>
	);
}
