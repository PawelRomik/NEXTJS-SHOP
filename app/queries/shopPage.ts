import { gql } from "@apollo/client";

export const GET_NEW_PRODUCTS = gql`
	query {
		products(pagination: { start: 0, limit: 8 }, sort: "createdAt:desc") {
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

export const GET_PRODUCTS_BY_CATEGORIES = gql`
	query getProducts($category: String!, $sex: [String!]) {
		products(
			pagination: { start: 0, limit: 100 }
			sort: "createdAt:desc"
			filters: { categories: { slug: { eq: $category } }, sexes: { sex: { in: $sex } } }
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

export const GET_SALE_PRODUCTS = gql`
	query {
		products(pagination: { start: 0, limit: 100 }, filters: { onSale: { eq: true } }) {
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
