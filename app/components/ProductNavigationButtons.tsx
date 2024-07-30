"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function ProductNavigationButtons() {
	const [activeSection, setActiveSection] = useState<string | null>("product");
	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId);
		if (section) {
			window.scrollTo({
				top: section.getBoundingClientRect().top + window.pageYOffset - 80,
				behavior: "smooth"
			});
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			const sections = ["product", "description", "technical", "others"];

			const scrollPosition = window.scrollY;
			let closestSection = null;
			let shortestDistance = Infinity;

			sections.forEach((sectionId) => {
				const section = document.getElementById(sectionId);
				if (section) {
					const sectionTop = section.offsetTop;
					const distance = Math.abs(sectionTop - scrollPosition);
					if (distance < shortestDistance) {
						shortestDistance = distance;
						closestSection = sectionId;
					}
				}
			});

			setActiveSection(closestSection);
			console.log(closestSection);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="fixed right-2 top-[50%] z-[5] flex translate-y-[-50%] flex-col gap-2">
			<button
				className={`${activeSection === "product" ? "bg-red-600" : "bg-white"} h-4 w-4 rounded-full`}
				onClick={() => scrollToSection("product")}
				title="Produkt"
			></button>
			<button
				className={`${activeSection === "description" ? "bg-red-600" : "bg-white"} h-4 w-4 rounded-full`}
				onClick={() => scrollToSection("description")}
				title="Opis"
			></button>
			<button
				className={`${activeSection === "technical" ? "bg-red-600" : "bg-white"} h-4 w-4 rounded-full`}
				onClick={() => scrollToSection("technical")}
				title="Techniczne"
			></button>
			<button
				className={`${activeSection === "others" ? "bg-red-600" : "bg-white"} h-4 w-4 rounded-full`}
				onClick={() => scrollToSection("others")}
				title="Inne produkty"
			></button>
		</div>
	);
}
