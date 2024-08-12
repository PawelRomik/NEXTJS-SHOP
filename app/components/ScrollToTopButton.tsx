"use client";

import { IconButton } from "@radix-ui/themes";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ScrollToTopButton() {
	const { t } = useTranslation();
	const [isVisible, setIsVisible] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const toggleVisibility = () => {
		if (window.scrollY > 200) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	useEffect(() => {
		const handleScroll = () => {
			toggleVisibility();
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<IconButton
			ref={buttonRef}
			className={`scroll-to-top-button fixed bottom-4 right-4 z-20 h-12 w-12 cursor-pointer border-2 border-solid border-red-600 bg-zinc-950 font-bold text-white transition  ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
			title={t("common:scrollButtonTitle")}
			onClick={scrollToTop}
		>
			<i className="ri-arrow-up-line"></i>
		</IconButton>
	);
}
