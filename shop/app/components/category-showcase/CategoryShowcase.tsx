import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { GET_CATEGORY_ALLDATA } from "../../queries/category";
import { getApolloClient } from "../../../apollo-client";
import { CategoryData } from "../../queries/productType";
import { ApolloQueryResult } from "@apollo/client";

export default async function CategoryShowcase({
	category,
	locale
}: {
	category: keyof IntlMessages["categories"];
	locale: string;
}) {
	const t = await getTranslations();
	const client = await getApolloClient();

	const { data }: ApolloQueryResult<CategoryData> = await client.query({
		query: GET_CATEGORY_ALLDATA,
		variables: {
			slug: category,
			locale
		}
	});

	const categoryData = data.categories.data[0]?.attributes;
	if (!categoryData) return null;

	const { name, desc, showcase } = categoryData;

	return (
		<div className="bg3d relative flex h-[500px] w-full flex-col items-center justify-around gap-4 overflow-hidden bg-cover bg-center bg-no-repeat shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)] md:grid md:grid-cols-[2fr_6fr]">
			<div className="z-[4] flex flex-col justify-center gap-2 px-5 text-white">
				<div className="flex w-full flex-col">
					<h1 className="py-3 text-4xl font-bold">{name}</h1>
					<div className="w-full border-[5px] border-transparent border-t-red-600" />
					<div className="w-[90%] border-[3px] border-transparent border-t-red-700" />
				</div>
				<p>{desc}</p>

				<Link href="/new" className="mb-5 flex w-full flex-col items-end">
					<button className="mr-10 w-[200px] rounded-lg bg-red-600 p-3 font-bold text-white hover:bg-red-500">
						{t("productSection.check")}
					</button>
				</Link>
			</div>

			{showcase?.data?.length ? (
				<div className="z-[3] flex items-center justify-around bg-contain">
					{showcase.data.slice(0, 3).map((item) => (
						<div
							key={item.attributes.url}
							style={{
								backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_PATH}${item.attributes.url})`
							}}
							className="mirror h-[100px] w-[100px] bg-contain bg-center bg-no-repeat md:h-[200px] md:w-[200px] lg:h-[400px] lg:w-[400px]"
						/>
					))}
				</div>
			) : null}
		</div>
	);
}
