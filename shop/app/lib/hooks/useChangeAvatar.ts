import { useUser } from "@clerk/nextjs";
import { useFeedback } from "../../lib/hooks/useFeedback";
import { useTranslations } from "next-intl";

export const useChangeAvatar = () => {
	const { isLoaded, user } = useUser();
	const t = useTranslations("settings");
	const { errorMessage, successMessage, showError, showSuccess } = useFeedback();

	const handleFileChange = async (file: File | null) => {
		if (!user || !file) return;

		try {
			await user.setProfileImage({ file });
			await user.reload();
			showSuccess(t("avatarSuccess"));
		} catch {
			showError(t("avatarError"));
		}
	};

	return {
		isLoaded,
		user,
		errorMessage,
		successMessage,
		handleFileChange
	};
};
