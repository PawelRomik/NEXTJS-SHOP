import { gql } from "@apollo/client";

export const GET_BUNDLES = gql`
	query getBundles($page: Int!, $locale: I18NLocaleCode!) {
		bundles(pagination: { page: $page, pageSize: 8 }, sort: "createdAt:desc", locale: $locale) {
			data {
				id
				attributes {
					name
					price
					display {
						data {
							attributes {
								url
							}
						}
					}
					products {
						data {
							id
							attributes {
								name
								price
								images {
									data {
										attributes {
											url
										}
									}
								}
								uuid
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
