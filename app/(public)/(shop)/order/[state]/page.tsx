
import { revalidatePath } from "next/cache";
import { Metadata } from "next";


export const metadata: Metadata = {
	title: "N3XT | Order Status"
};

export default async function OrderPage({ params }: { params: { productId: string } }) {
	revalidatePath("/order/[state]", "page");

	return (
		<div className="flex flex-1 flex-col items-stretch justify-start gap-6  lg:flex-row">
			
		</div>
	);
}
