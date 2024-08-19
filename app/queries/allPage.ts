import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
	query getAllProducts($locale: I18NLocaleCode!) {
		products(pagination: { limit: 100 }, sort: "createdAt:desc", locale: $locale) {
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
