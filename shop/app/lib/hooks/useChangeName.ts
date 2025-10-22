import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useFeedback } from "../../lib/hooks/useFeedback";
import { useTranslations } from "next-intl";

export const useChangeName = () => {
	const { isLoaded, user } = useUser();
	const { errorMessage, successMessage, showError, showSuccess } = useFeedback();
	const [username, setUsername] = useState("");
	const t = useTranslations("settings");

	useEffect(() => {
		if (user?.username) setUsername(user.username);
	}, [user?.username]);

	const handleSubmit = async () => {
		if (!user) return;
		if (username.length < 4) return showError(t("shortName"));

		try {
			await user.update({ username });
			await user.reload();
			showSuccess(t("usernameSuccess"));
			setUsername("");
		} catch {
			showError(t("usernameError"));
		}
	};

	return {
		isLoaded,
		user,
		username,
		setUsername,
		errorMessage,
		successMessage,
		handleSubmit
	};
};
