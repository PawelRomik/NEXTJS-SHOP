import { gql } from "@apollo/client";

export const GET_NEW_PRODUCTS = gql`
	query getNewProducts($sex: [String!], $page: Int) {
		products(
			pagination: { page: $page, pageSize: 8 }
			sort: "createdAt:desc"
			filters: { sexes: { sex: { in: $sex } } }
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

export const GET_PRODUCTS_BY_CATEGORIES = gql`
	query getProducts($category: String!, $sex: [String!], $page: Int) {
		products(
			pagination: { page: $page, pageSize: 8 }
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
			meta {
				pagination {
					pageCount
				}
			}
		}
	}
`;

export const GET_SALE_PRODUCTS = gql`
	query getSaleProducts($sex: [String!], $page: Int) {
		products(
			pagination: { page: $page, pageSize: 8 }
			filters: { onSale: { eq: true }, sexes: { sex: { in: $sex } } }
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
