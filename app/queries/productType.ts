type ProductData = {
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
					slug: string;
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
