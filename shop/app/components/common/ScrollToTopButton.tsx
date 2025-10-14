"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

export default function ScrollToTopButton() {
	const t = useTranslations("common");
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					setIsVisible(window.scrollY > 200);
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	return (
		<button
			className={`scroll-to-top-button fixed bottom-4 right-4 z-20 h-12 w-12 cursor-pointer border-2 border-solid border-red-600 bg-zinc-950 text-xl font-bold text-white transition hover:bg-red-600  hover:text-3xl ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
			title={t("scrollButtonTitle")}
			onClick={scrollToTop}
			aria-label={t("scrollButtonTitle")}
		>
			<i className="ri-arrow-up-line "></i>
		</button>
	);
}
