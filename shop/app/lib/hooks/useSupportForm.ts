"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export type FormData = {
	email: string;
	subject: string;
	description: string;
	attachments: File[];
};

export function useSupportForm() {
	const t = useTranslations("support");

	const [formData, setFormData] = useState<FormData>({
		email: "",
		subject: "",
		description: "",
		attachments: []
	});

	const [errors, setErrors] = useState<Record<keyof Omit<FormData, "attachments">, string>>({
		email: "",
		subject: "",
		description: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (files: FileList | null, inputEl?: HTMLInputElement) => {
		if (!files) return;

		let fileArray = Array.from(files);

		const totalFiles = formData.attachments.length + fileArray.length;

		if (totalFiles > 5) {
			alert(t("maxFiles"));
			return;
		}

		const tooLargeFiles = fileArray.filter((file) => file.size > 50 * 1024 * 1024);
		if (tooLargeFiles.length > 0) {
			alert(`${tooLargeFiles.map((f) => f.name).join(", ")} ${t("fileTooLarge")}`);
			if (inputEl) inputEl.value = "";
			return;
		}

		setFormData((prev) => ({
			...prev,
			attachments: [...prev.attachments, ...fileArray]
		}));

		if (inputEl) inputEl.value = "";
	};

	const removeAttachment = (index: number) => {
		setFormData((prev) => ({
			...prev,
			attachments: prev.attachments.filter((_, i) => i !== index)
		}));
	};

	const validateForm = () => {
		const newErrors = { email: "", subject: "", description: "" };
		let isValid = true;

		if (!formData.email.includes("@")) {
			newErrors.email = t("invalidEmail");
			isValid = false;
		}
		if (!formData.subject.trim()) {
			newErrors.subject = t("invalidTopic");
			isValid = false;
		}
		if (!formData.description.trim()) {
			newErrors.description = t("invalidDesc");
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const resetForm = () => {
		setFormData({ email: "", subject: "", description: "", attachments: [] });
		setErrors({ email: "", subject: "", description: "" });
	};

	return {
		formData,
		errors,
		handleChange,
		handleFileChange,
		removeAttachment,
		validateForm,
		resetForm
	};
}
