"use client";

import Link from "next/link";
import { SearchWords } from "./SearchInput";

type SearchResultsProps = {
	searchWords?: SearchWords[];
};

export default function SearchResults({ searchWords }: SearchResultsProps) {
	return (
		<div className="absolute right-0 top-[100%] w-[100vw] overflow-hidden border-b-[3px] border-red-600 bg-zinc-800 lg:w-1/4 lg:border-l-[3px]">
			{searchWords &&
				searchWords.map((word) => (
					<div key={word.attributes.slug} className="p-4 text-zinc-400">
						<Link href={`/search?query=${word.attributes.slug}&page=1`}>
							<p className="hover:text-red-600">{word.attributes.name}</p>
						</Link>
					</div>
				))}
		</div>
	);
}
