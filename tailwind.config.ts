import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
			},
			keyframes: {
				showNav: {
					"0%": {
						transform: "scaleY(0)"
					},
					"100%": {
						transform: "scaleY(1)"
					}
				},
				showSearchbar: {
					"0%": {
						transform: "scaleX(0)"
					},
					"100%": {
						transform: "scaleX(1)"
					}
				}
			},
			animation: {
				showNav: "showNav 0.1s linear forwards",
				showSearchbar: "showSearchbar 0.1s linear forwards"
			}
		}
	},
	plugins: []
};
export default config;
