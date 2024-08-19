import { gql } from "@apollo/client";

export const GET_NEW_PRODUCTS_ORDER = gql`
	query getNewProducts($sex: [String!], $locale: I18NLocaleCode!) {
		products(
			pagination: { limit: 5 }
			sort: "createdAt:desc"
			filters: { sexes: { sex: { in: $sex } } }
			locale: $locale
		) {
			data {
				id
				attributes {
					name
					uuid
					price
					onSale
					salePrice
					image {
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
