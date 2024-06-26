import { gql } from "@apollo/client";

export const GET_NEW_PRODUCTS_ORDER = gql`
	query getNewProducts($sex: [String!]) {
		products(
			pagination: { limit: 5 }
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
