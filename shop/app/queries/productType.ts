export type ProductData = {
	id: string;
	attributes: {
		name: string;
		price: number;
		desc: string;
		salePrice: number;
		onSale: boolean;
		technical: string;
		uuid: string;
		images: {
			data: {
				attributes: {
					url: string;
				};
			}[];
		};
		sexes: {
			data: {
				attributes: {
					sex: string;
				};
			}[];
		};
		categories: {
			data: {
				attributes: {
					name: string;
					slug: keyof IntlMessages["categories"];
				};
			}[];
		};
	};
};

export type KeywordsData = {
	fancywords: {
		data: {
			id: string;
			attributes: {
				name: string;
			};
		}[];
	};
};

export type FiltersData = {
	filters: {
		data: {
			id: string;
			attributes: {
				name: string;
				tags: {
					data: {
						attributes: {
							name: string;
						};
					}[];
				};
			};
		}[];
	};
};

export type RatesData = {
	convertionrates: {
		data: {
			id: string;
			attributes: {
				currency: string;
				rate: number;
			};
		}[];
	};
};

export type CategoriesData = {
	categories: {
		data: {
			id: string;
			attributes: {
				name: string;
				slug: keyof IntlMessages["categories"];
			};
		}[];
	};
};

export type OrderHistoryData = {
	orders: {
		data: {
			id: string;
			attributes: {
				createdAt: string;
			};
		}[];
		meta: {
			pagination: {
				pageCount: number;
				total: number;
			};
		};
	};
};

export type OrderData = {
	orders: {
		data: {
			id: string;
			attributes: {
				createdAt: string;
				products: {
					id: string;
					name: string;
					price: number;
					quantity: number;
				}[];
			};
		}[];
	};
};

export type CategoryData = {
	categories: {
		data: {
			id: string;
			attributes: {
				name: string;
				slug: keyof IntlMessages["categories"];
				showcase: {
					data: {
						attributes: {
							url: string;
						};
					}[];
				};
				desc: string;
				image: {
					data: {
						attributes: {
							url: string;
						};
					};
				};
				category_group: {
					data: {
						attributes: {
							name: keyof IntlMessages["categories"];
						};
					};
				};
			};
		}[];
	};
};

export type QueryResult = {
	products: {
		data: ProductData[];
		meta: {
			pagination: {
				pageCount: number;
				total: number;
			};
		};
	};
};

type BundlesData = {
	id: string;
	attributes: {
		name: string;
		price: number;
		display: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
		products: { data: ProductData[] };
	};
};

export type BundlesResult = {
	bundles: {
		data: BundlesData[];
		meta: {
			pagination: {
				pageCount: number;
				total: number;
			};
		};
	};
};
