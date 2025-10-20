"use client";

import { useTranslations } from "next-intl";
import { useSupportForm } from "../../lib/hooks/useSupportForm";
import { SupportFormField } from "./SupportFormField";
import { FileUploader } from "./FileUploader";

export default function SupportForm() {
	const t = useTranslations("support");
	const {
		formData,
		errors,
		handleChange,
		handleFileChange,
		removeAttachment,
		validateForm,
		resetForm
	} = useSupportForm();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateForm()) return;

		const formDataToSend = new FormData();
		formDataToSend.append("email", formData.email);
		formDataToSend.append("subject", formData.subject);
		formDataToSend.append("description", formData.description);
		formData.attachments.forEach((file) => {
			formDataToSend.append("attachments", file);
		});

		try {
			const res = await fetch("/api/support", {
				method: "POST",
				body: formDataToSend
			});
			if (!res.ok) throw new Error("Request failed");

			alert(t("formSent"));
			resetForm();
		} catch {
			alert(t("formError"));
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mx-auto flex-[2] rounded-lg bg-[rgb(12,12,12)] p-2 pt-8 text-white md:p-6 md:pt-4"
		>
			<h2 className="mb-6 text-center text-4xl font-bold uppercase">{t("sendTicket")}</h2>

			<SupportFormField
				label={t("email")}
				name="email"
				type="email"
				value={formData.email}
				error={errors.email}
				onChange={handleChange}
			/>

			<SupportFormField
				label={t("topic")}
				name="subject"
				type="text"
				value={formData.subject}
				error={errors.subject}
				onChange={handleChange}
			/>

			<SupportFormField
				label={t("desc")}
				name="description"
				as="textarea"
				value={formData.description}
				error={errors.description}
				onChange={handleChange}
			/>

			<FileUploader
				onChange={handleFileChange}
				attachments={formData.attachments}
				removeAttachment={removeAttachment}
				label={t("attachments")}
				optionalLabel={t("optional")}
			/>

			<button
				type="submit"
				className="mt-8 w-full rounded bg-red-600 px-4 py-6 text-2xl font-bold uppercase text-white hover:bg-red-700 md:mt-0"
			>
				{t("send")}
			</button>
		</form>
	);
}
