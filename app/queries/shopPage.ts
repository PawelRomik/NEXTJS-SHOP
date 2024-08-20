import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORIES = gql`
	query getProducts($category: String!, $page: Int!, $tags: [String], $locale: I18NLocaleCode!) {
		products(
			pagination: { page: $page, pageSize: 8 }
			sort: "createdAt:desc"
			filters: { categories: { slug: { eq: $category } }, tags: { name: { in: $tags } } }
			locale: $locale
		) {
			data {
				id
				attributes {
					name
					price
					uuid
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
