import { getApolloClient } from "../../../apollo-client";
import { CategoryData } from "../../queries/productType";
import { ApolloQueryResult } from "@apollo/client";
import { GET_CATEGORY_ALLDATA } from "../../queries/category";
import Stripes from "../ui/Stripes";
import CategoryDisplay from "./CategoryDisplay";

type CategoryBannerProps = {
	category: keyof IntlMessages["categories"];
	num: number;
	locale: string;
};

export default async function CategoryBanner({ category, num, locale }: CategoryBannerProps) {
	const direction = num % 2 === 0;
	const client = await getApolloClient();
	let name: string | null = null;
	let desc: string | null = null;
	let imageUrl: string | null = null;

	try {
		const { data }: ApolloQueryResult<CategoryData> = await client.query({
			query: GET_CATEGORY_ALLDATA,
			variables: {
				slug: category,
				locale: locale
			}
		});

		const categoryData = data?.categories?.data?.[0]?.attributes;
		name = categoryData?.name ?? null;
		desc = categoryData?.desc ?? null;
		imageUrl = categoryData?.image?.data?.attributes?.url ?? null;
	} catch (e) {
		return null;
	}

	return (
		<div className="relative z-[20] h-[550px] w-full overflow-hidden bg-red-700 bg-[size:60%_100%]  bg-center lg:h-[400px] ">
			<div className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-zinc-950  bg-center bg-no-repeat py-3 lg:flex-row lg:gap-5">
				<Stripes direction={direction} />
				<CategoryDisplay
					direction={direction}
					name={name}
					desc={desc}
					imageUrl={imageUrl}
					category={category}
				/>
			</div>
		</div>
	);
}
