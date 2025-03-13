import { gql } from "@apollo/client";

export const GET_CATEGORY_IMAGE = gql`
	query getCategories($slug: String!) {
		categories(filters: { slug: { eq: $slug } }) {
			data {
				id
				attributes {
					slug
					image {
						data {
							attributes {
								url
							}
						}
					}
				}
			}
		}
	}
`;
