import { getLocale } from "next-intl/server";

const formatPrice = async (price: number): Promise<string> => {
	const locale = await getLocale();
	const priceInCurrency = price / 100;

	switch (locale) {
		case "pl":
			return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(
				priceInCurrency
			);
		case "en":
			return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
				priceInCurrency
			);
		default:
			return new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(
				priceInCurrency
			);
	}
};

export default formatPrice;
