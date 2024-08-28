import { useLocale } from "next-intl";

const useCurrency = () => {
	const locale = useLocale();

	switch (locale) {
		case "pl":
			return "PLN";
		case "en":
			return "USD";
		default:
			return "EUR";
	}
};

export default useCurrency;
