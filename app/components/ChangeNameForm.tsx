"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

function ChangeNameForm() {
	const t = useTranslations("settings");
	const { isLoaded, user } = useUser();
	const [username, setUsername] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	if (!isLoaded || !user?.id) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		if (username.length < 4) {
			setErrorMessage(t("shortName"));
			return;
		}

		try {
			await user.update({ username });
			await user.reload();
			setSuccessMessage(t("usernameSuccess"));
		} catch (err) {
			setErrorMessage(t("usernameError"));
		}
		setTimeout(() => {
			setErrorMessage(null);
			setSuccessMessage(null);
		}, 3000);
	};

	return (
		<div className="flex flex-col items-center gap-4 text-white">
			<h1 className="w-full text-center text-3xl font-bold uppercase">{t("changeUsername")}</h1>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			{successMessage && <p className="text-green-500">{successMessage}</p>}
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-5">
					<label htmlFor="username">{t("newUsername")}</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="rounded p-2 text-black"
					/>
				</div>
				<button type="submit" className="rounded bg-red-600 px-4 py-2 text-white">
					{t("changeUsername")}
				</button>
			</form>
		</div>
	);
}

export default ChangeNameForm;
