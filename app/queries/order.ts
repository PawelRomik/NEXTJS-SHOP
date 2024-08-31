import { gql } from "@apollo/client";

export const GET_NEW_PRODUCTS_ORDER = gql`
	query getOrderProducts($locale: I18NLocaleCode!) {
		products(pagination: { limit: 5 }, sort: "createdAt:desc", locale: $locale) {
			data {
				id
				attributes {
					name
					uuid
					price
					desc
					salePrice
					images {
						data {
							attributes {
								url
							}
						}
					}
					categories {
						data {
							attributes {
								name
							}
						}
					}
				}
			}
			meta {
				pagination {
					pageCount
				}
			}
		}
	}
`;
