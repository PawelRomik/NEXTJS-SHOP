import { gql } from "@apollo/client";

export const GET_SEARCH_PRODUCTS = gql`
	query getProducts($name: String!) {
		products(
			pagination: { start: 0, limit: 8 }
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
