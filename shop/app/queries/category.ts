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

export const GET_CATEGORY_ALLDATA = gql`
	query getCategories($slug: String!, $locale: I18NLocaleCode!) {
		categories(filters: { slug: { eq: $slug } }, locale: $locale) {
			data {
				id
				attributes {
					name
					slug
					desc
					image {
						data {
							attributes {
								url
							}
						}
					}
					showcase {
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

export const GET_CATEGORY_NAME = gql`
	query getCategoryName($slug: String!, $locale: I18NLocaleCode!) {
		categories(filters: { slug: { eq: $slug } }, locale: $locale) {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;

export const GET_CATEGORY_DESC = gql`
	query getCategories($slug: String!, $locale: I18NLocaleCode!) {
		categories(filters: { slug: { eq: $slug } }, locale: $locale) {
			data {
				id
				attributes {
					desc
				}
			}
		}
	}
`;

export const GET_CATEGORY_SHOWCASE = gql`
	query getCategories($slug: String!) {
		categories(filters: { slug: { eq: $slug } }) {
			data {
				id
				attributes {
					showcase {
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
	query getCategories($locale: I18NLocaleCode!) {
		categories(pagination: { limit: 100 }, locale: $locale) {
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
