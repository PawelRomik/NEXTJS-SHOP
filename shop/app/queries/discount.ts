import { gql } from "@apollo/client";

export const GET_DISCOUNT_BY_NAME = gql`
	query GetDiscountByName($code: String!, $locale: I18NLocaleCode!) {
		discounts(filters: { code: { eq: $code } }, locale: $locale) {
			data {
				attributes {
					code
					value
				}
			}
		}
	}
`;

export type DiscountData = {
	discounts: {
		data: {
			attributes: {
				code: string;
				value: number;
			};
		}[];
	};
};
