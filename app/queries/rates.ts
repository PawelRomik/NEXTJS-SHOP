import { gql } from "@apollo/client";

export const GET_RATES = gql`
	query getRates($currency: String!) {
		convertionrates(filters: { currency: { eq: $currency } }) {
			data {
				id
				attributes {
					currency
					rate
				}
			}
		}
	}
`;
