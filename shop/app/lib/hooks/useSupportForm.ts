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

	const handleFileChange = (files: FileList | null) => {
		if (!files) return;
		const newFiles = Array.from(files);

		if (formData.attachments.length + newFiles.length > 5) {
			alert(t("maxFiles"));
			return;
		}

		setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
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
