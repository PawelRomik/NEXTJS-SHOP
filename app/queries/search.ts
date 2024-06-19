import { gql } from "@apollo/client";

export const GET_SEARCH_PRODUCTS = gql`
	query getProducts($name: String!, $page: Int) {
		products(
			pagination: { page: $page, pageSize: 8 }
			sort: "createdAt:desc"
			filters: { name: { contains: $name } }
		) {
			data {
				id
				attributes {
					name
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

export const GET_SEARCH_PRODUCTS_COUNT = gql`
	query getProducts($name: String!) {
		products(
			pagination: { limit: 100 }
			sort: "createdAt:desc"
			filters: { name: { contains: $name } }
		) {
			data {
				id
				attributes {
					name
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
		}
	}
`;
