import { gql } from "@apollo/client";

export const GET_PRODUCT_DESC = gql`
	query getProduct($productId: String!, $locale: I18NLocaleCode!) {
		products(filters: { uuid: { eq: $productId } }, locale: $locale) {
			data {
				id
				attributes {
					name
					desc
					categories {
						data {
							attributes {
								name
								slug
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_PRODUCTS_BY_IDS = gql`
	query GetProductsByIds($ids: [String!]!, $locale: I18NLocaleCode!) {
		products(filters: { uuid: { in: $ids } }, locale: $locale) {
			data {
				id
				attributes {
					name
					price
					uuid
					salePrice
					desc
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
		}
	}
`;

export const GET_PRODUCT_TECHNICAL = gql`
	query getProduct($productId: String!, $locale: I18NLocaleCode!) {
		products(filters: { uuid: { eq: $productId } }, locale: $locale) {
			data {
				id
				attributes {
					technical
				}
			}
		}
	}
`;

export const GET_PRODUCT_NAME = gql`
	query getProduct($productId: String!, $locale: I18NLocaleCode!) {
		products(filters: { uuid: { eq: $productId } }, locale: $locale) {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;
export const GET_PRODUCT_IMAGES = gql`
	query getProduct($productId: String!, $locale: I18NLocaleCode!) {
		products(filters: { uuid: { eq: $productId } }, locale: $locale) {
			data {
				id
				attributes {
					name
					images {
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

export const GET_PRODUCT_PRICE = gql`
	query getProduct($productId: String!) {
		products(filters: { uuid: { eq: $productId } }) {
			data {
				id
				attributes {
					price
					salePrice
				}
			}
		}
	}
`;

export const GET_PRODUCT_CATEGORY = gql`
	query getProduct($productId: String!, $locale: I18NLocaleCode!) {
		products(filters: { uuid: { eq: $productId } }, locale: $locale) {
			data {
				id
				attributes {
					categories {
						data {
							attributes {
								name
								slug
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_PRODUCT_ALLDATA = gql`
	query getProducts($productId: String!, $locale: I18NLocaleCode!) {
		products(filters: { uuid: { eq: $productId } }, locale: $locale) {
			data {
				id
				attributes {
					name
					price
					uuid
					salePrice
					desc
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
		}
	}
`;

export const GET_OTHER_PRODUCTS = gql`
	query getProducts($productId: String!, $category: String!, $locale: I18NLocaleCode!) {
		products(
			pagination: { limit: 5 }
			filters: { categories: { slug: { eq: $category } }, uuid: { ne: $productId } }
			locale: $locale
		) {
			data {
				id
				attributes {
					name
					price
					uuid
					salePrice
					desc
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
		}
	}
`;

export const GET_RANDOM_PRODUCTS = gql`
	query getProducts($startIndex: Int!, $category: String!, $locale: I18NLocaleCode!) {
		products(
			pagination: { limit: 4, start: $startIndex }
			filters: { categories: { slug: { eq: $category } } }
			locale: $locale
		) {
			data {
				id
				attributes {
					name
					price
					uuid
					salePrice
					desc
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
		}
	}
`;
