export const getCurrency = (locale: string) => {
	switch (locale) {
		case "pl":
			return "PLN";
		case "en":
			return "USD";
		default:
			return "USD";
	}
};
