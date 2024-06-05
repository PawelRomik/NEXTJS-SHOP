type ProductData = {
	id: string;
	attributes: {
		name: string;
		price: number;
		desc: string;
		salePrice: number;
		onSale: boolean;
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
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

export type QueryResultSingle = {
	product: {
		data: ProductData;
	};
};
export type QueryResult = {
	products: {
		data: ProductData[];
	};
};
