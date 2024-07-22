import { gql } from "@apollo/client";

export const GET_SEARCH_PRODUCTS = gql`
	query getProducts($name: String!, $page: Int) {
		products(
			pagination: { page: $page, pageSize: 8 }
			sort: "createdAt:desc"
			filters: {
				or: [
					{ fancywords: { name: { eqi: $name } } }
					{ name: { containsi: $name } }
					{ categories: { name: { eqi: $name } } }
				]
			}
		) {
			data {
				id
				attributes {
					name
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

export const GET_SEARCH_PRODUCTS_COUNT = gql`
	query getSearchProducts($name: String!, $page: Int) {
		products(
			pagination: { page: $page, pageSize: 8 }
			sort: "createdAt:desc"
			filters: {
				or: [
					{ fancywords: { name: { eqi: $name } } }
					{ name: { containsi: $name } }
					{ categories: { name: { eqi: $name } } }
				]
			}
		) {
			data {
				id
				attributes {
					name
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
					total
				}
			}
		}
	}
`;

export const GET_KEYWORDS = gql`
	query getFancyWords($name: String!) {
		fancywords(pagination: { limit: 5 }, filters: { name: { startsWith: $name } }) {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;

export const GET_CATEGORY = gql`
	query getCategory($name: String!) {
		categories(pagination: { limit: 5 }, filters: { name: { startsWith: $name } }) {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;
