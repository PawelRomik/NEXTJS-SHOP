"use client";
import { IconButton } from "@radix-ui/themes";
import React, { useState, useEffect, useRef } from "react";

export default function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const toggleVisibility = () => {
		if (window.scrollY > 400) {
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
			adjustButtonPosition();
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const adjustButtonPosition = () => {
		const button = buttonRef.current;
		const footer = document.querySelector("footer");
		const footerTop = (footer?.getBoundingClientRect().top || 0) + window.scrollY;
		const windowBottom = window.scrollY + window.innerHeight;
		if (button) {
			if (windowBottom > footerTop) {
				button.style.position = "absolute";
				button.style.bottom = `7rem`;
			} else {
				button.style.position = "fixed";
				button.style.bottom = "1rem";
			}
		}
	};

	return (
		<IconButton
			ref={buttonRef}
			className={`scroll-to-top-button fixed right-4 h-12 w-12 cursor-pointer border-2 border-solid border-red-600 bg-zinc-950 font-bold text-white transition  ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
			title="Go to top"
			onClick={scrollToTop}
		>
			<i className="ri-arrow-up-line"></i>
		</IconButton>
	);
}
