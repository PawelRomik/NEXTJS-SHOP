export const formatPrice = (price: number, rate: number) => {
	const priceInCurrency = price * 0.01;
	return (priceInCurrency * rate).toFixed(2);
};
