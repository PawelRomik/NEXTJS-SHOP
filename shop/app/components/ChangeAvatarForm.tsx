"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useTranslations } from "next-intl";

function ChangeAvatarForm() {
	const { isLoaded, user } = useUser();
	const t = useTranslations("settings");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	if (!isLoaded || !user?.id) return null;

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setErrorMessage(null);
		setSuccessMessage(null);

		const formData = new FormData();
		formData.append("file", file);

		try {
			await user.setProfileImage({ file });
			await user.reload();
			setSuccessMessage(t("avatarSuccess"));
		} catch (err) {
			setErrorMessage(t("avatarError"));
		}
		setTimeout(() => {
			setErrorMessage(null);
			setSuccessMessage(null);
		}, 3000);
	};

	return (
		<div className="flex flex-col items-center gap-4 text-white">
			<h1 className="w-full text-center text-3xl font-bold uppercase">{t("changeAvatar")}</h1>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			{successMessage && <p className="text-green-500">{successMessage}</p>}
			<label className="relative cursor-pointer">
				<input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
				<div className="group relative h-[200px] w-[200px] overflow-hidden rounded-full border-white transition ">
					<Image
						src={user.imageUrl}
						alt="Avatar"
						layout="fill"
						objectFit="cover"
						className="rounded-full border-[10px] border-double border-red-600"
					/>
					<i className="ri-loop-right-line absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-7xl transition group-hover:text-red-500"></i>
				</div>
			</label>
		</div>
	);
}

export default ChangeAvatarForm;
