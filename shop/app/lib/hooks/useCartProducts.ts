import { useEffect, useState } from "react";
import { getApolloClient } from "../../../apollo-client";
import { GET_PRODUCTS_BY_IDS } from "../../queries/productPage";

export type Product = {
	id: string;
	uuid: string;
	name: string;
	desc: string;
	price: number;
	onSale: boolean;
	image: string;
	quantity: number;
};

type ProductId = {
	id: string;
	attributes: {
		uuid: string;
		name: string;
		desc: string;
		price: number;
		salePrice?: number;
		images: { data: { attributes: { url: string } }[] };
	};
};

export function useCartProducts(productIds: { id: string; quantity: number }[], locale: string) {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (!productIds.length) {
			setProducts([]);
			return;
		}

		(async () => {
			try {
				const client = await getApolloClient();
				const { data } = await client.query({
					query: GET_PRODUCTS_BY_IDS,
					variables: {
						ids: productIds.map((p) => p.id),
						locale
					}
				});

				setProducts(
					data.products.data.map((p: ProductId) => {
						const cartItem = productIds.find((item) => item.id === p.attributes.uuid);
						return {
							id: p.id,
							uuid: p.attributes.uuid,
							name: p.attributes.name,
							desc: p.attributes.desc,
							price: p.attributes.salePrice || p.attributes.price,
							onSale: !!p.attributes.salePrice,
							image: p.attributes.images.data[0]?.attributes.url || "",
							quantity: cartItem?.quantity ?? 0
						};
					})
				);
			} catch {
				setProducts([]);
			}
		})();
	}, [productIds, locale]);

	return products;
}
