const formatCurrency = (locale: string) => {
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
