import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
	GET_CATEGORY_ALLDATA,
	GET_CATEGORY_DESC,
	GET_CATEGORY_NAME,
	GET_CATEGORY_SHOWCASE
} from "../queries/category";
import createApolloClient from "../../apollo-client";
import { CategoriesData, CategoryData, QueryResult } from "../queries/productType";
import { ApolloQueryResult } from "@apollo/client";

export default async function CategoryShowcase({
	category,
	locale
}: {
	category: keyof IntlMessages["categories"];
	locale: string;
}) {
	const t = await getTranslations();

	async function getName() {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<CategoryData> = await client.query({
				query: GET_CATEGORY_NAME,
				variables: {
					slug: category,
					locale: locale
				}
			});

			return data.categories.data[0].attributes.name;
		} catch (e) {
			return null;
		}
	}

	async function getDesc() {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<CategoryData> = await client.query({
				query: GET_CATEGORY_DESC,
				variables: {
					slug: category,
					locale: locale
				}
			});

			return data.categories.data[0].attributes.desc;
		} catch {
			return null;
		}
	}

	async function fetchShowcase() {
		try {
			const client = await createApolloClient();
			const { data }: ApolloQueryResult<CategoryData> = await client.query({
				query: GET_CATEGORY_SHOWCASE,
				variables: {
					slug: category
				}
			});
			return data.categories.data[0].attributes.showcase;
		} catch (e) {
			return null;
		}
	}

	async function getShowcaseImg() {
		const showcase = await fetchShowcase();
		console.log(showcase);
		if (showcase == null) return;
		return (
			<div className=" z-[3] flex items-center justify-around bg-contain">
				{showcase.data.slice(0, 3).map((item, index) => (
					<div
						key={index}
						style={{
							backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_PATH}${item.attributes.url})`
						}}
						className="mirror h-[100px] w-[100px] bg-contain bg-center bg-no-repeat md:h-[200px] md:w-[200px] lg:h-[400px] lg:w-[400px]"
					></div>
				))}
			</div>
		);
	}

	return (
		<div className="bg3d relative flex h-[500px] w-full grid-cols-[2fr_6fr] flex-col items-center justify-around gap-4 overflow-hidden bg-cover bg-center  bg-no-repeat shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)]  md:grid">
			<div className=" z-[4] flex flex-col justify-center gap-2  px-5  text-white">
				<div className="flex w-full flex-col">
					<h1 className="py-3 text-4xl font-bold">{await getName()}</h1>
					<div className="w-full border-[5px] border-transparent border-t-red-600 "></div>
					<div className="w-[90%] border-[3px] border-transparent border-t-red-700"></div>
				</div>
				<p>{await getDesc()}</p>

				<Link href="/new" className="mb-5  flex w-full flex-col items-end">
					<button className="mr-10 w-[200px] rounded-lg bg-red-600 p-3 font-bold text-white hover:bg-red-500">
						{t("productSection.check")}
					</button>
				</Link>
			</div>
			{await getShowcaseImg()}
		</div>
	);
}
