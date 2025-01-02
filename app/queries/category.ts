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

export const GET_CATEGORIES = gql`
	query getCategories {
		categories(pagination: { limit: 30 }) {
			data {
				id
				attributes {
					name
					slug
					image {
						data {
							attributes {
								url
							}
						}
					}
					category_group {
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
