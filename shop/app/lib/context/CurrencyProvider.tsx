import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrency } from "../utils/getCurrency";
import { useParams } from "next/navigation";
import { getApolloClient } from "../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { RatesData } from "../../queries/productType";
import { GET_RATES } from "../../queries/rates";

type CurrencyContextType = {
	exchangeRate: number;
	currency: string;
};

const CurrencyContext = createContext<CurrencyContextType>({
	exchangeRate: 1,
	currency: "USD"
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
	const [exchangeRate, setExchangeRate] = useState(1);
	const [currency, setCurrency] = useState("USD");
	const params = useParams<{ locale: string }>();

	useEffect(() => {
		const locale = params.locale || "en";
		const fetchExchangeRate = async () => {
			let targetCurrency = getCurrency(locale);

			try {
				const client = await getApolloClient();
				const { data }: ApolloQueryResult<RatesData> = await client.query({
					query: GET_RATES,
					variables: {
						currency: targetCurrency
					}
				});

				setCurrency(targetCurrency);
				setExchangeRate(data.convertionrates.data[0].attributes.rate);
			} catch {
				return null;
			}
		};

		fetchExchangeRate();
	}, [params]);

	return (
		<CurrencyContext.Provider value={{ exchangeRate, currency }}>
			{children}
		</CurrencyContext.Provider>
	);
};

export const useCurrency = (): CurrencyContextType => {
	return useContext(CurrencyContext);
};
