import { Grid } from "@radix-ui/themes";
import ProductDisplay from "../../components/ProductDisplay";
import shirt from "../../../public/shirt.webp";

export default function HomePage() {
	return (
		<main className="flex-1 p-6">
			<Grid gap="4" width="auto" className="grid-cols-1 p-6 lg:grid-cols-4">
				<ProductDisplay
					name="Black T-Shirt"
					price={200}
					imageUrl={shirt}
					category="Shirts"
				></ProductDisplay>
				<ProductDisplay
					name="Black T-Shirt"
					price={200}
					imageUrl={shirt}
					category="Shirts"
				></ProductDisplay>
				<ProductDisplay
					name="Black T-Shirt"
					price={200}
					imageUrl={shirt}
					category="Shirts"
				></ProductDisplay>
				<ProductDisplay
					name="Black T-Shirt"
					price={200}
					imageUrl={shirt}
					category="Shirts"
				></ProductDisplay>
				<ProductDisplay
					name="Black T-Shirt"
					price={200}
					imageUrl={shirt}
					category="Shirts"
				></ProductDisplay>
				<ProductDisplay
					name="Black T-Shirt"
					price={200}
					imageUrl={shirt}
					category="Shirts"
				></ProductDisplay>
				<ProductDisplay
					name="Black T-Shirt"
					price={200}
					imageUrl={shirt}
					category="Shirts"
				></ProductDisplay>
				<ProductDisplay
					name="Black T-Shirt"
					price={200}
					imageUrl={shirt}
					category="Shirts"
				></ProductDisplay>
			</Grid>
		</main>
	);
}
