import { useState } from "react";

export function useFeedback(timeout = 3000) {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const showError = (msg: string) => {
		setErrorMessage(msg);
		setTimeout(() => setErrorMessage(null), timeout);
	};

	const showSuccess = (msg: string) => {
		setSuccessMessage(msg);
		setTimeout(() => setSuccessMessage(null), timeout);
	};

	return { errorMessage, successMessage, showError, showSuccess };
}
