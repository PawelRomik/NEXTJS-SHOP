import { getLocale } from "next-intl/server";

const formatCurrency = async () => {
	const locale = await getLocale();

	switch (locale) {
		case "pl":
			return "PLN";
		case "en":
			return "USD";
		default:
			return "EUR";
	}
};

export default formatCurrency;
