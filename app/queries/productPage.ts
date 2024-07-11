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
