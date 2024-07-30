import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
	query {
		products(pagination: { limit: 100 }, sort: "createdAt:desc") {
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
