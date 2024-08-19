import { gql } from "@apollo/client";

export const GET_FILTERS = gql`
	query getFilters($category: String!, $locale: I18NLocaleCode!) {
		filters(filters: { category: { slug: { eq: $category } } }, locale: $locale) {
			data {
				id
				attributes {
					name
					tags {
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
