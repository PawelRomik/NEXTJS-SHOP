"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useChangeAvatar } from "../../lib/hooks/useChangeAvatar";

export default function ChangeAvatarForm() {
	const t = useTranslations("settings");
	const { isLoaded, user, errorMessage, successMessage, handleFileChange } = useChangeAvatar();

	if (!isLoaded || !user?.id) return null;

	return (
		<div className="flex flex-col items-center gap-4 text-white">
			<h1 className="w-full text-center text-3xl font-bold uppercase">{t("changeAvatar")}</h1>

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

			<label className="relative cursor-pointer">
				<input
					type="file"
					accept="image/*"
					className="hidden"
					onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
				/>
				<div className="group relative h-[200px] w-[200px] overflow-hidden rounded-full border-white transition">
					<Image
						src={user.imageUrl}
						alt="Avatar"
						fill
						style={{ objectFit: "cover" }}
						className="rounded-full border-[10px] border-double border-red-600"
					/>
					<i className="ri-loop-right-line absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-7xl transition group-hover:text-red-500" />
				</div>
			</label>
		</div>
	);
}
