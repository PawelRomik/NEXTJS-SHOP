import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../components/ProductDisplay";
import products from "../../data/products";

export default function HomePage() {
	return (
		<main className="flex-1 p-6	">
			<Grid gap="4" width="auto" className="grid-cols-1 p-6 lg:grid-cols-4">
				{products.map((product) => (
					<ProductDisplay
						id={product.id}
						name={product.name}
						price={product.price}
						category={product.category}
						imageUrl={product.imageUrl}
						key={product.id}
					></ProductDisplay>
				))}
			</Grid>
		</main>
	);
}
