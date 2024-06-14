import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_ID = gql`
	query getProduct($productId: ID!) {
		product(id: $productId) {
			data {
				id
				attributes {
					name
					price
					salePrice
					onSale
					desc
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
								slug
							}
						}
					}
					sexes {
						data {
							attributes {
								sex
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_OTHER_PRODUCTS = gql`
	query getProducts($productId: ID!, $category: String!, $sex: String!) {
		products(
			pagination: { limit: 5 }
			filters: {
				categories: { slug: { eq: $category } }
				sexes: { sex: { eq: $sex } }
				id: { ne: $productId }
			}
		) {
			data {
				id
				attributes {
					name
					price
					onSale
					salePrice
					desc
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
