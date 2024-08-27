import { DE, ES, FR, PL, US } from "country-flag-icons/react/3x2";

export default function Flag({ country }: { country: string }) {
	const getFlag = () => {
		switch (country) {
			case "pl":
				return <PL title="Polski" className="w-[1.5rem]" />;
			case "fr":
				return <FR title="Français" className="w-[1.5rem]" />;
			case "en":
				return <US title="English" className="w-[1.5rem]" />;
			case "es":
				return <ES title="Español" className="w-[1.5rem]" />;
			case "de":
				return <DE title="Deutsch" className="w-[1.5rem]" />;
			default:
				return <US title="English" className="w-[1.5rem]" />;
		}
	};

	return getFlag();
}
