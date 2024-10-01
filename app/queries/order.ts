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

export const GET_ORDER_HISTORY = gql`
	query getOrders($user: String!, $page: Int!) {
		orders(
			pagination: { page: $page, pageSize: 10 }
			sort: "createdAt:desc"
			filters: { user: { eq: $user } }
		) {
			data {
				id
				attributes {
					createdAt
				}
			}
		}
	}
`;

export const GET_ORDER = gql`
	query getOrder($orderId: ID!) {
		order(id: $orderId) {
			data {
				id
				attributes {
					createdAt
					products
				}
			}
		}
	}
`;
