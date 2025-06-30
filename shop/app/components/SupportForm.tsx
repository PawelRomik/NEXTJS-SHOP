"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type FormData = {
	email: string;
	subject: string;
	description: string;
	attachments: File[];
};

export default function SupportForm() {
	const [formData, setFormData] = useState<FormData>({
		email: "",
		subject: "",
		description: "",
		attachments: []
	});
	const [errors, setErrors] = useState<{ email: string; subject: string; description: string }>({
		email: "",
		subject: "",
		description: ""
	});

	const t = useTranslations("support");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let files = Array.from(e.target.files || []);

		if (formData.attachments.length + files.length > 5) {
			alert("Można dodać tylko maksymalnie 5 plików.");
			e.target.value = "";
			return;
		}

		setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }));
		e.target.value = "";
	};

	const removeAttachment = (index: number) => {
		setFormData((prev) => ({
			...prev,
			attachments: prev.attachments.filter((_, i) => i !== index)
		}));
	};

	const validateForm = () => {
		let newErrors = { email: "", subject: "", description: "" };
		let isValid = true;

		if (!formData.email.includes("@")) {
			newErrors.email = "Podaj poprawny adres e-mail";
			isValid = false;
		}
		if (formData.subject.trim() === "") {
			newErrors.subject = "Temat nie może być pusty";
			isValid = false;
		}
		if (formData.description.trim() === "") {
			newErrors.description = "Opis problemu nie może być pusty";
			isValid = false;
		}
		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateForm()) return;

		console.log("Wysłano formularz:", formData);
		alert("Formularz został wysłany!");
		setFormData({
			email: "",
			subject: "",
			description: "",
			attachments: []
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mx-auto flex-[2] rounded-lg pt-8 md:pt-0 bg-[rgb(12,12,12)] p-2 md:p-6 text-white"
		>
			<h2 className="mb-6 text-center text-4xl font-bold uppercase">{t("sendTicket")}</h2>

			<div className="mb-4 flex items-center flex-col lg:flex-row px-3 md:px-0 justify-center gap-3">
				<label className="block w-full text-center lg:text-right lg:w-[10rem] text-xl font-bold uppercase">{t("email")}</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
					className="flex-1 rounded-lg w-full lg:w-auto bg-white p-3 text-black "
				/>
				{errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
			</div>

			<div className="mb-4 flex items-center flex-col lg:flex-row px-3 md:px-0 justify-center gap-3">
				<label className="block w-full text-center lg:text-right lg:w-[10rem] text-xl font-bold uppercase">{t("topic")}</label>
				<input
					type="text"
					name="subject"
					value={formData.subject}
					onChange={handleChange}
					required
					className="flex-1 rounded-lg w-full lg:w-auto bg-white p-3 text-black"
				/>
				{errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
			</div>

			<div className="mb-4 flex items-center flex-col lg:flex-row px-3 md:px-0 justify-center gap-3">
				<label className="block w-full text-center lg:text-right lg:w-[10rem] text-xl font-bold uppercase">{t("desc")}</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
					className="flex-1 rounded-lg w-full lg:w-auto bg-white p-3 text-black"
				/>
				{errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
			</div>

			<div className="md:mb-4 flex flex-col  items-start justify-center gap-3 w-full">
				<div className="mb-4 w-full flex items-center flex-col lg:flex-row px-3 md:px-0 justify-center gap-3">
					<label className=" w-full text-center lg:text-right lg:w-[10rem] text-xl font-bold uppercase flex-col flex">{t("attachments")} <span className="text-gray-300 text-base">{t("optional")}</span></label>
					<input
						type="file"
						multiple
						onChange={handleFileChange}
						className="flex-1 rounded-lg w-full lg:w-auto bg-white p-3 text-black"
					/>
				</div>
				{formData.attachments.length > 0 && <ul className="mt-2 flex min-h-[60px] gap-3">
					{formData.attachments.map((file, index) => (
						<li
							key={index}
							className="flex items-center flex-wrap justify-between gap-3 rounded-md border-2 border-red-600 bg-red-600 p-2 text-white"
						>
							<a
								href={URL.createObjectURL(file)}
								download={file.name}
								className="max-w-xs truncate underline"
							>
								{file.name.length > 15 ? `${file.name.slice(0, 15)}...` : file.name}
							</a>
							<button
								className="h-[2rem] w-[2rem] rounded-lg border-2 border-red-700 bg-red-500"
								onClick={() => removeAttachment(index)}
							>
								X
							</button>
						</li>
					))}
				</ul>}
			</div>

			<Button
				type="submit"
				className="w-full mt-8 md:mt-0 rounded bg-red-600 px-4 py-6 text-2xl font-bold uppercase text-white hover:bg-red-700"
			>
				{t("send")}
			</Button>
		</form>
	);
}
