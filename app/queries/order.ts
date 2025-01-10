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
			pagination: { page: $page, pageSize: 12 }
			sort: "createdAt:desc"
			filters: { user: { eq: $user } }
		) {
			data {
				id
				attributes {
					createdAt
				}
			}
			meta {
				pagination {
					pageCount
					total
				}
			}
		}
	}
`;

export const GET_ORDER = gql`
	query getOrder($user: String!, $orderId: ID!) {
		orders(filters: { user: { eq: $user }, id: { eq: $orderId } }) {
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

export const GET_ORDER_PRODUCT = gql`
	query getProducts($productId: String!, $locale: I18NLocaleCode!) {
		products(filters: { uuid: { eq: $productId } }, locale: $locale) {
			data {
				attributes {
					name
					images {
						data {
							attributes {
								url
							}
						}
					}
				}
			}
		}
	}
`;
