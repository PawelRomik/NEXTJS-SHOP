import { gql } from "@apollo/client";
export const GET_FILTERS = gql`
	query getFilters($category: String!) {
		filters(filters: { category: { slug: { eq: $category } } }) {
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
