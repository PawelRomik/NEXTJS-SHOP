import { gql } from "@apollo/client";

export const GET_PRODUCT_DESC = gql`
	query getProduct($productId: ID!) {
		product(id: $productId) {
			data {
				id
				attributes {
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

export const GET_PRODUCT_TECHNICAL = gql`
	query getProduct($productId: ID!) {
		product(id: $productId) {
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
	query getProduct($productId: ID!) {
		product(id: $productId) {
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
	query getProduct($productId: ID!) {
		product(id: $productId) {
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
	query getProduct($productId: ID!) {
		product(id: $productId) {
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
	query getProduct($productId: ID!) {
		product(id: $productId) {
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
	query getProducts($productId: ID!) {
		product(id: $productId) {
			data {
				id
				attributes {
					name
					price
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
	query getProducts($productId: ID!, $category: String!) {
		products(
			pagination: { limit: 5 }
			filters: { categories: { slug: { eq: $category } }, id: { ne: $productId } }
		) {
			data {
				id
				attributes {
					name
					price
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
