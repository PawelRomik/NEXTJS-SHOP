import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import createApolloClient from "../../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { QueryResult } from "../../../queries/productType";
import ErrorText from "../../../components/ErrorText";
import ProductDisplay from "../../../components/ProductDisplay";
import { revalidatePath } from "next/cache";
import { Grid } from "@radix-ui/themes";
import { Suspense } from "react";
import SkeletonProductDisplay from "../../../components/SkeletonProductDisplay";
import { GET_NEW_PRODUCTS } from "../../../queries/shopPage";
import CategoryShowcase from "../../../components/CategoryShowcase";
import Image from "next/image";
import { formatPrice } from "../../../lib/utils/formatPrice";
import CartContent from "../../../components/CartContent";

type CategoryKeys = keyof IntlMessages["categories"];

export async function generateMetadata({
	params: { locale }
}: {
	params: { category: CategoryKeys; locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "cart" });

	return {
		title: `${t("cart")} | Ephonix`
	};
}

export default async function cartPage({
	params: { locale }
}: {
	params: {
		locale: string;
	};
}) {
	revalidatePath("/[locale]/cart", "page");

	return (
		<main className=" w-full flex-1  bg-[rgb(20,20,20)]">
			<CartContent />
		</main>
	);
}
