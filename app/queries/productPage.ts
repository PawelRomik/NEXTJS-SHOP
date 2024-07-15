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
					desc
					technical
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
								slug
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_OTHER_PRODUCTS = gql`
	query getProducts($productId: ID!, $category: String!) {
		products(
			pagination: { limit: 5 }
			filters: { categories: { slug: { eq: $category } }, id: { ne: $productId } }
		) {
			data {
				id
				attributes {
					name
					price
					salePrice
					desc
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
		}
	}
`;
